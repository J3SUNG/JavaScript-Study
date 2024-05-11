try {
  console.log("try");
  throw new Error("DB Connection Error", {
    cause: {
      error: "Password is incorrect",
      value: "1234",
      message: ["too short", "only number not allowed"],
    },
  });
} catch (e) {
  console.log(e.message, e.cause);
} finally {
  console.log("finally");
}
