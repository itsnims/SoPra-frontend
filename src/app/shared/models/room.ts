import {User} from './user';

export class Room {
  public id: number;
  public name: string;
  public owner: string;
  public pwdBool: boolean;
  public pwd: string;
  public pathname: string;
  public maxPlayers: string;
  public maxplayer: number;
  public current: number;
  public status: string;
  public players: User[]= [];
}
