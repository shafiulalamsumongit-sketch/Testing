public class Calculator {

    private double toDouble(Object input, String label) {
        if (input == null) {
            throw new NullPointerException(
                label + " is null");
        }
        if (!(input instanceof Number)) {
            throw new IllegalArgumentException(
                label + ": expected a Number, got "
                + input.getClass().getSimpleName()
                + " (\"" + input + "\") ");
        }
        return ((Number) input).doubleValue();
    }

    public double add(Object a, Object b) {
        return toDouble(a, "a") + toDouble(b, "b");
    }

    public double subtract(Object a, Object b) {
        return toDouble(a, "a") - toDouble(b, "b");
    }

    public double multiply(Object a, Object b) {
        return toDouble(a, "a") * toDouble(b, "b");
    }

    
    public double divide(Object a, Object b) {
        double x = toDouble(a, "a");
        double y = toDouble(b, "b");
        if (y == 0) {
            throw new ArithmeticException(
                "Cannot divide by zero!");
        }
        return x / y;
    }

  
    public static void main(String[] args) {

        Calculator calc = new Calculator();

        // 1. Valid operations
        try { System.out.println("10 + 5 = "  + calc.add(10, 5));       }
        catch (Exception e) { System.out.println("Error: " + e.getMessage()); }

        try { System.out.println("10 - 5 = "  + calc.subtract(10, 5));  }
        catch (Exception e) { System.out.println("Error: " + e.getMessage()); }

        try { System.out.println("10 * 5 = "  + calc.multiply(10, 5));  }
        catch (Exception e) { System.out.println("Error: " + e.getMessage()); }

        try { System.out.println("10 / 2 = "  + calc.divide(10, 2));   }
        catch (Exception e) { System.out.println("Error: " + e.getMessage()); }

        // 2. ArithmeticException — divide by zero
        try { calc.divide(10, 0); }
        catch (ArithmeticException e) {
            System.out.println("ArithmeticException: " + e.getMessage());
        }

        // 3. IllegalArgumentException — wrong type (String)
        try { calc.add("ten", 5); }
        catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException: " + e.getMessage());
        }

        // 4. IllegalArgumentException — wrong type (Boolean)
        try { calc.multiply(true, 5); }
        catch (IllegalArgumentException e) {
            System.out.println("IllegalArgumentException: " + e.getMessage());
        }

        // 5. NullPointerException — null input
        try { calc.subtract(null, 5); }
        catch (NullPointerException e) {
            System.out.println("NullPointerException: " + e.getMessage());
        }
    }
}