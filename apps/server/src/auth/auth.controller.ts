import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from '@auth/auth.service';
import { RegisterDTO } from '@auth/register.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() registerDTO: RegisterDTO) {
        const user = await this.authService.register(registerDTO)
        return {
            message: "Inscription réussie.",
            user: user
        }
    }

}
