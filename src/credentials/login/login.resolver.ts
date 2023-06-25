import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { CredentialsService } from '../credentials.service';
import { LoginService } from './login.service';
import { HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { LoginGuard } from './login.guard';
import { Credential } from '../entities/credential.entity';
import { Response } from 'express';

@Resolver(() => Credential)
export class LoginResolver {
  constructor(
    private readonly credentialsService: CredentialsService,
    private readonly loginService: LoginService,
  ) {}

  @Mutation(() => Credential, { name: 'login' })
  @UseGuards(LoginGuard)
  async login(
    @Args('username') username: string,
    @Args('password') password: string,
    @Res() res: Response,
    @Context() context: any,
  ) {
    
    try {
      const val = await this.loginService.login(username, password);
      if (!val) {
        throw new Error('Invalid Username or Password');
      }
      if (val.token) {
        context.res.cookie('__user', `${val.token}`, { httpOnly: true }, { maxAge: 1000 });
        return val.user;
      }
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNAUTHORIZED);
    }
  }

  @Query(() => String)
  getCookieValue(@Context('req') req: any): string {
    const cookieValue = req.cookies['__user'];
    return cookieValue;
  }

  // logout
  @Mutation(() => Boolean)
  async logout(@Context() context: any) {
    context.res.clearCookie('__user');
    return true;
  }
}