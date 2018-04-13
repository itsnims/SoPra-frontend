import {User} from './user';

export class Room {
  public id: number;
  public name: string;
  public pwdBool: boolean;
  public pwd: string;
  public path: string;
  public maxPlayers: string;
  public status: string;
  public PlayersInRoom: User[]= [];
}
