declare namespace chatApp {
  type Message = {
    from: string,
    text: string,
    date: number
  };

  type generateMessage = (from: string, text: string) => Message;
}

