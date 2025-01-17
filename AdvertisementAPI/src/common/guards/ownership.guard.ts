import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
  import { AdsService } from '../../ads/ads.service';
  
  @Injectable()
  export class OwnershipGuard implements CanActivate {
    constructor(private readonly adsService: AdsService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user; // Extracted from JWT token
      const adId = parseInt(request.params.id, 10);
  
      const ad = await this.adsService.findOne(adId);
      if (!ad) {
        throw new ForbiddenException('Ad not found.');
      }
  
      if (ad.authorId !== user.sub && !user.roles.includes('admin')) {
        throw new ForbiddenException(
          'You do not have permission to modify this ad.',
        );
      }
  
      return true;
    }
  }
  