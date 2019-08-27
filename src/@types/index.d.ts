declare namespace chatApp {
  interface ClientMessage {
    text: string
  }

  interface ServerMessage extends ClientMessage {
    from: string,
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

  interface SearchParams {
    name: string,
    room: string
  }

  interface User {
    id: string,
    name: string,
    room: string
  }
}
