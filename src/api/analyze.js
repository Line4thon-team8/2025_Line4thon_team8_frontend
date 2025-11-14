import client from "./client";

export const analyze = async ({userId, url}) => {
    const {data} = await client.get("/chat/analyze", {
        params: {
            userId: userId ?? 1,
            url: url ?? "https://chatgpt.com/share/68fa6d87-b2c8-8011-b6c5-bd3272ea992c",
        }
    });

    const extractId = data.extract_id;
    const content = data.content;

    let topics = [];

    if (content){
        topics = content
        .split("\n")
        .map(line => line.replace(/^\d+\. \s*/, "")) //1 제거
        .map(line => line.replace(/\s*-\s*\d+%/, "")) //"- 35%제거"
        .map(line => line.trim())
        .filter(Boolean);
    }

    //topics 파싱 실패 시 기본값 지정
    if(topics.length === 0){
        topics = [
            "SSL/TLS 암호화 프로토콜",
            "하이브리드 자산관리 시스템",
            "채권과 금융 운용",
        ];
    }

    return {extractId, topics};
};