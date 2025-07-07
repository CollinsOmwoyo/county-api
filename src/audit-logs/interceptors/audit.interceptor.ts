import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AuditLogsService } from '../audit-logs.service';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly audit: AuditLogsService) {}

  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    const userId = req.user.userId;
    const { method, originalUrl } = req;
    return next.handle().pipe(
      tap(() => {
        this.audit.log(userId, method, originalUrl, req.params.id || '');
      }),
    );
  }
}
