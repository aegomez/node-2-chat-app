declare namespace chatApp {
  interface Message {
    from: string,
    text: string
  }

  interface DatedMessage extends Message {
    date: number
  }

  interface Location {
    latitude: number,
    longitude: number
  }

  interface LocationMessage {
    from: string,
    url: string,
    date: number
  }
}
