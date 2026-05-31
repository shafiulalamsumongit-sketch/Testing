function checkPayment(amount) {
  // invalid type check
  if (typeof amount !== "number" || Number.isNaN(amount)) {
    return {
      success: false,
      message: "invalid amount"
    };
  }

  // Infinity edge cases
  if (amount === Infinity) {
    return {
      success: true,
      message: "payment accepted"
    };
  }

  if (amount === -Infinity) {
    return {
      success: false,
      message: "payment rejected"
    };
  }

  // negative or zero
  if (amount <= 0) {
    return {
      success: false,
      message: "payment rejected"
    };
  }

  // business rule
  if (amount >= 100) {
    return {
      success: true,
      message: "payment accepted"
    };
  }

  return {
    success: false,
    message: "payment rejected"
  };
}

module.exports = { checkPayment };
