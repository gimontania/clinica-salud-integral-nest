import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";


@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  //logger de nestjs para mostrar los registros en la terminal
  private readonly logger = new Logger('HTTP')

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //obtenemos el request HTTP actual
    const request = context.switchToHttp().getRequest()

    //extraemos el método http y la url
    const { method, url } = request

    //guardamos el momento en que comienza la petición
    const start = Date.now()

    //ejecutamos el resto del pipeline y observamos la respuesta
    return next.handle().pipe(
      tap(() => {
        //calculamos cuanto tardó la petición
        const ms = Date.now() - start

        //mostramos método, url y tiempo de respuesta
        this.logger.log(`${method} ${url} - ${ms}ms`)
      }),
    )
  }
}
