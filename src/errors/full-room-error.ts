import { ApplicationError } from "@/protocols";

export function fullRoomError(): ApplicationError {
  return {
    name: "FullRoomError",
    message: "This room has already achieved it's capacity!",
  };
}
