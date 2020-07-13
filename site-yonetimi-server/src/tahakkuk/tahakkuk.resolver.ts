import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'apollo-server-express';
import { Tahakkuk } from './tahakkuk.entity';
import { TahakkukService } from './tahakkuk.service';
import { TahakkuksArgs } from './dto/tahakkuk.args';

const pubSub = new PubSub();

@Resolver(of => Tahakkuk)
export class TahakkuksResolver {
  constructor(private readonly service: TahakkukService) {}

  @Query(returns => Tahakkuk)
  async tahakkuk(@Args('id') id: string): Promise<Tahakkuk> {
    const tahakkuk = await this.service.findById(id);
    if (!tahakkuk) {
      throw new NotFoundException(id);
    }
    return tahakkuk;
  }

  @Query(returns => [Tahakkuk])
  tahakkuks(@Args() tahakkuksArgs: TahakkuksArgs): Promise<Tahakkuk[]> {
    return this.service.findAllByQuery(tahakkuksArgs);
  }

  @Mutation(returns => Tahakkuk)
  async addTahakkuk(
    @Args('newTahakkuk') newTahakkuk: Tahakkuk,
  ): Promise<Tahakkuk> {
    const tahakkuk = await this.service.create(newTahakkuk);
    pubSub.publish('tahakkukAdded', { tahakkukAdded: tahakkuk });
    return tahakkuk;
  }

  @Mutation(returns => Boolean)
  async removeTahakkuk(@Args('id') id: string) {
    return this.service.delete(id);
  }

  @Subscription(returns => Tahakkuk)
  tahakkukAdded() {
    return pubSub.asyncIterator('tahakkukAdded');
  }
}
