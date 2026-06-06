public class BankAccount {

    // Private variables
    private String accountNumber;
    private double balance;

    // Constructor BankAccount(x,y)
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    // Getter — private balance 
    public double getBalance() {
        return this.balance;
    }

    // Deposit method
    public void deposit(double amount) {
        if (amount <= 0) {
            System.out.println("Error: Deposit amount must be positive.");
            return;
        }
        this.balance += amount;
        System.out.println("Deposited $" + amount
            + ". New balance: $" + this.balance);
    }

    // Withdrawal method — guards against negative balance
    public void withdraw(double amount) {
        if (amount <= 0) {
            System.out.println("Error: Withdrawal amount must be positive.");
            return;
        }
        if (amount > this.balance) {
            System.out.println("Error: Insufficient funds. "
                + "Balance: $" + this.balance);
            return;
        }
        this.balance -= amount;
        System.out.println("Withdrew $" + amount
            + ". New balance: $" + this.balance);
    }

    // Display account information
    public void displayAccountInfo() {
        System.out.println("Display account information >> ");
        System.out.println("Account Number : " + this.accountNumber);
        System.out.println("Current Balance: $" + getBalance());
        System.out.println("");
    }

    
    public static void main(String[] args) {

    //Create BankAccount object
    BankAccount myAccount = new BankAccount("SHA-786-02-1042", 3000.00);
    System.out.println("Account created successfully!");

    //Deposit an amount 
    
    
    myAccount.deposit("1200.00");

    //Withdraw an amount 
    myAccount.withdraw(400.00);

    //Display account information
    myAccount.displayAccountInfo();
}
    
    
    
    
    
    
    
    
    
    
    
}