import { Injectable } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@Injectable()
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsService {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, string[]>();

  addUserSocket(userId: string, socketId: string) {
    const userSockets = this.userSockets.get(userId) || [];
    this.userSockets.set(userId, [...userSockets, socketId]);
  }

  removeSocket(socketId: string) {
    this.userSockets.forEach((sockets, userId) => {
      const updatedSockets = sockets.filter(id => id !== socketId);
      if (updatedSockets.length === 0) {
        this.userSockets.delete(userId);
      } else {
        this.userSockets.set(userId, updatedSockets);
      }
    });
  }

  async sendToUser(userId: string, event: string, data: any) {
    const socketIds = this.userSockets.get(userId) || [];
    socketIds.forEach(socketId => {
      this.server.to(socketId).emit(event, data);
    });
  }

  async notifyFriendRequest(receiverId: string, sender: any) {
    await this.sendToUser(receiverId, 'friendRequest', {
      type: 'FRIEND_REQUEST',
      sender: {
        id: sender.id,
        name: sender.name,
      },
      timestamp: new Date().toISOString(),
    });
  }

  async notifyFriendRequestAccepted(userId: string, accepter: any) {
    await this.sendToUser(userId, 'friendRequestAccepted', {
      type: 'FRIEND_REQUEST_ACCEPTED',
      accepter: {
        id: accepter.id,
        name: accepter.name,
      },
      timestamp: new Date().toISOString(),
    });
  }

  async notifyFriendRequestRejected(userId: string, rejecter: any) {
    await this.sendToUser(userId, 'friendRequestRejected', {
      type: 'FRIEND_REQUEST_REJECTED',
      rejecter: {
        id: rejecter.id,
        name: rejecter.name,
      },
      timestamp: new Date().toISOString(),
    });
  }
}