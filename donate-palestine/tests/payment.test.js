const { checkPayment } = require("../src/payment");

describe("CASE : DONATION FOR PALTESTINE", () => {

    describe("ACCEPTED CASES > 100 ", () => {
        test("accepts amount exactly 150", () => {
            expect(checkPayment(150)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });
        test("accepts amount greater than 100", () => {
            expect(checkPayment(1999999)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });
    });

    describe("REJECTED CASES (< 100) ", () => {

        test("rejects amount 99.99", () => {
            expect(checkPayment(99.99)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
        test("rejects amount 1", () => {
            expect(checkPayment(1)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
    });

    describe("ZERO & NEGATIVE EDGE CASES ", () => {

        test("rejects 0", () => {
            expect(checkPayment(0)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
        test("rejects negative value -1 ", () => {
            expect(checkPayment(-1)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
        test("rejects 0.01", () => {
            expect(checkPayment(0.01)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
    });

    describe("BOUNDARY TESTS (100)", () => {

        test("rejects 99", () => {
            expect(checkPayment(99)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });

        test("accepts 100", () => {
            expect(checkPayment(100)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });

        test("accepts 101", () => {
            expect(checkPayment(101)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });

        test("rejects 99.99", () => {
            expect(checkPayment(99.99)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });

        test("accepts 100.01", () => {
            expect(checkPayment(100.01)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });

    });

    describe("INVALID TYPE CASES ", () => {

        test("rejects string input", () => {
            expect(checkPayment("100")).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("rejects null", () => {
            expect(checkPayment(null)).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("rejects undefined", () => {
            expect(checkPayment(undefined)).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("rejects array", () => {
            expect(checkPayment([])).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("rejects object", () => {
            expect(checkPayment({})).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("rejects function", () => {
            expect(checkPayment(() => { })).toEqual({
                success: false,
                message: "invalid amount",
            });
        });
    });
    
    describe("SPECIAL NUMBERS ", () => {

        test("handles NaN", () => {
            expect(checkPayment(NaN)).toEqual({
                success: false,
                message: "invalid amount",
            });
        });

        test("handles Infinity", () => {
            expect(checkPayment(Infinity)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });

        test("handles -Infinity", () => {
            expect(checkPayment(-Infinity)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });

        test("handles MAX_SAFE_INTEGER", () => {
            expect(checkPayment(Number.MAX_SAFE_INTEGER)).toEqual({
                success: true,
                message: "payment accepted",
            });
        });

        test("handles MIN_SAFE_INTEGER", () => {
            expect(checkPayment(Number.MIN_SAFE_INTEGER)).toEqual({
                success: false,
                message: "payment rejected",
            });
        });
    });


});
