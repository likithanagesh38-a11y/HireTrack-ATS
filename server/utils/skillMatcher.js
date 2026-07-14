function calculateMatch(jobSkills, candidateSkills) {
  const job = jobSkills
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const candidate = candidateSkills
    .toLowerCase()
    .split(",")
    .map((skill) => skill.trim());

  const matched = job.filter((skill) =>
    candidate.includes(skill)
  );

  const missing = job.filter(
    (skill) => !candidate.includes(skill)
  );

  const score = Math.round(
    (matched.length / job.length) * 100
  );

  return {
    score,
    matched,
    missing,
  };
}

module.exports = calculateMatch;