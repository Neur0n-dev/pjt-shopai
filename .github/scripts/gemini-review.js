/**
 * [gemini-review.js]
 * git diff 추출 → Gemini API 호출 → PR 코멘트 등록
 */

const { execSync } = require('child_process');
const { CODE_REVIEW_PROMPT } = require('./prompts/code-review.js');

// 환경변수
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO = process.env.REPO;
const PR_NUMBER = process.env.PR_NUMBER;
const BASE_SHA = process.env.BASE_SHA;
const HEAD_SHA = process.env.HEAD_SHA;

/** Gemini 응답 최대 토큰 수 */
const MAX_OUTPUT_TOKENS = 2048;

/** diff 최대 길이 (Gemini 컨텍스트 제한 대비) */
const MAX_DIFF_LENGTH = 12000;

/** PR 코멘트 식별용 마커 (중복 방지) */
const BOT_COMMENT_MARKER = '<!-- gemini-code-review -->';

/**
 * git diff 추출 (base..head)
 */
function extractDiff() {
  const diff = execSync(`git diff ${BASE_SHA} ${HEAD_SHA}`).toString();

  if (!diff.trim()) {
    return null;
  }

  // diff가 너무 길면 자르기
  if (diff.length > MAX_DIFF_LENGTH) {
    return diff.slice(0, MAX_DIFF_LENGTH) + '\n\n... (diff가 너무 길어 일부 생략됨)';
  }

  return diff;
}

/**
 * Gemini API 호출
 */
async function callGemini(diff) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const body = {
    contents: [
      {
        parts: [
          {
            text: CODE_REVIEW_PROMPT + diff,
          },
        ],
      },
    ],
    generationConfig: {
      maxOutputTokens: MAX_OUTPUT_TOKENS,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Gemini API 오류: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '리뷰 결과를 가져올 수 없습니다.';
}

/**
 * GitHub API — 기존 봇 코멘트 조회
 */
async function findExistingBotComment() {
  const url = `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
  });

  if (!response.ok) return null;

  const comments = await response.json();
  return comments.find((c) => c.body.includes(BOT_COMMENT_MARKER));
}

/**
 * GitHub API — PR 코멘트 등록 또는 업데이트
 */
async function upsertPrComment(reviewText) {
  const body = `${BOT_COMMENT_MARKER}\n## 🤖 Gemini 코드리뷰\n\n${reviewText}`;

  const existingComment = await findExistingBotComment();

  // 기존 봇 코멘트가 있으면 업데이트, 없으면 새로 등록
  if (existingComment) {
    const url = `https://api.github.com/repos/${REPO}/issues/comments/${existingComment.id}`;
    await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    });
  } else {
    const url = `https://api.github.com/repos/${REPO}/issues/${PR_NUMBER}/comments`;
    await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ body }),
    });
  }
}

/**
 * 메인 실행
 */
async function main() {
  // 1단계: diff 추출
  const diff = extractDiff();
  if (!diff) {
    console.log('변경된 코드가 없어 리뷰를 건너뜁니다.');
    return;
  }

  // 2단계: Gemini API 호출
  console.log('Gemini 코드리뷰 요청 중...');
  const reviewText = await callGemini(diff);

  // 3단계: PR 코멘트 등록
  console.log('PR 코멘트 등록 중...');
  await upsertPrComment(reviewText);

  console.log('✅ 코드리뷰 완료');
}

main().catch((err) => {
  console.error('코드리뷰 실패:', err.message);
  process.exit(1);
});
