import { Test, TestingModule } from '@nestjs/testing';
import { CreateNotificationDto } from './create-notification.dto';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  let service: NotificationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        {
          provide: NotificationsService,
          useValue: {
            notifyUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
    service = module.get<NotificationsService>(NotificationsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call notifyUser and return confirmation message', async () => {
    const dto: CreateNotificationDto = {
      type: 'email',
      recipient: 'test@example.com',
      message: 'Test Message',
    };

    const response = await controller.sendNotification(dto);

    expect(service.notifyUser).toHaveBeenCalledWith(dto.type, dto.recipient, dto.message);
    expect(response).toEqual({ message: 'Notification has been queued.' });
  });
});
