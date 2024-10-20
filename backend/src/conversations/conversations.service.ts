import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { IUser } from 'src/users/users.interface';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @Inject(forwardRef(() => ConversationMembersService))
    private cmService: ConversationMembersService,
  ) {}

  // find conversation by id
  async findConversionById(conversation_id: string) {
    const conversation = await this.conversationsRepository.findOneBy({
      conversation_id,
    });
    if (conversation) return conversation;
    throw new NotFoundException('Conversation not found');
  }

  async create(user: IUser, dto: CreateConversationDto) {
    const createdBy = user.user_id;
    const conversation = await this.conversationsRepository.save({
      createdBy: createdBy,
      conversation_name: dto.conversation_name,
    });

    await this.cmService.createConversation({
      conversation_id: conversation.conversation_id,
      user_id: conversation.createdBy,
    });
    return conversation;
  }
}
