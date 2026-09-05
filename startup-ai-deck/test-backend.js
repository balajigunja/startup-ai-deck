async function test() {
  const payload = {
    startupName: "CampusBite",
    oneLiner: "Autonomous 15-minute food delivery robots for college campuses",
    problem: "Campus dining halls close early and food delivery apps charge $8+ in delivery fees with 60-minute wait times",
    targetCustomer: "College students and campus faculty",
    industry: "Autonomous Robotics / Food Delivery",
    freeTextDescription: "We deploy small electric rovers mapped to campus pedestrian walkways",
    audiencePersona: "vc",
    tone: "punchy",
    length: "standard",
  };

  console.log("Testing POST /api/generate...");
  const genRes = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const genData = await genRes.json();
  console.log("Generate status:", genRes.status, "Success:", genData.success);
  console.log("Slides generated:", Object.keys(genData.slides || {}));
  console.log("Readiness Score:", genData.score?.overallScore, "Grade:", genData.score?.grade);
  console.log("Investor Q&A count:", genData.qa?.length);

  console.log("\nTesting POST /api/regenerate/competition...");
  const regenRes = await fetch("http://localhost:3001/api/regenerate/competition", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pitchInput: payload }),
  });
  const regenData = await regenRes.json();
  console.log("Regenerate status:", regenRes.status, "Headline:", regenData.slide?.headline);

  console.log("\nTesting POST /api/chat (Ask the VC)...");
  const chatRes = await fetch("http://localhost:3001/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Why should you invest in our campus robots?" }],
      pitchInput: payload,
    }),
  });
  const chatData = await chatRes.json();
  console.log("Chat status:", chatRes.status, "VC sentiment:", chatData.sentiment);
  console.log("VC reply preview:", chatData.reply?.slice(0, 80) + "...");
}

test().catch(console.error);
