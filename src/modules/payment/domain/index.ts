interface PaymentProps {
  id: string;
  amount: number;
  completed: boolean;
}

interface CardProps extends PaymentProps {
  accountNo: string | null;
  provider: string | null;
}

export class ClientPayment {
  id: string;
  completed: boolean;
  amount: number;

  constructor({ id, amount, completed }: PaymentProps) {
    this.id = id;
    this.completed = completed;
    this.amount = amount;
  }
}

export class ClientCardPayment extends ClientPayment {
  accountNo: string | null;
  provider: string | null;

  constructor(props: CardProps) {
    super(props);
    this.accountNo = props.accountNo;
    this.provider = props.provider;
  }
}
