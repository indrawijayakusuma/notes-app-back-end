const ClientError = require('../../exceptions/ClientError');

class AuthenticationsHandler {
    constructor(authenticationsService, usersService, tokenManager, validator) {
        this.authenticationsService = authenticationsService;
        this.usersService = usersService;
        this.tokenManager = tokenManager;
        this.validator = validator;
    }

    async postAuthenticationHandler(request, h) {
        try {
        this.validator.validatePostAuthenticationPayload(request.payload);

        const { username, password } = request.payload;

        const id = await this.usersService.verifyUserCredential(username, password);

        const accessToken = this.tokenManager.generateAccessToken({ id });
        const refreshToken = this.tokenManager.generateRefreshToken({ id });

        await this.authenticationsService.addRefreshToken(refreshToken);

        const response = h.response({
            status: 'success',
            message: 'Authentication berhasil ditambahkan',
            data: {
            accessToken,
            refreshToken,
            },
        });
        response.code(201);
        return response;
        } catch (error) {
        if (error instanceof ClientError) {
            const response = h.response({
            status: 'fail',
            message: error.message,
            });
            response.code(error.statusCode);
            return response;
        }

        // Server ERROR!
        const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
        });
        response.code(500);
        console.error(error);
        return response;
        }
    }

    async putAuthenticationHandler(request, h) {
        try {
            this.validator.validatePutAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this.authenticationsService.verifyRefreshToken(refreshToken);
            const { id } = this.tokenManager.verifyRefreshToken(refreshToken);

            const accessToken = this.tokenManager.generateAccessToken({ id });
            return {
                status: 'success',
                message: 'Access Token berhasil diperbarui',
                data: {
                    accessToken,
                },
            };
        } catch (error) {
            if (error instanceof ClientError) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
            }

            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteAuthenticationHandler(request, h) {
        try {
            this.validator.validateDeleteAuthenticationPayload(request.payload);

            const { refreshToken } = request.payload;
            await this.authenticationsService.verifyRefreshToken(refreshToken);
            await this.authenticationsService.deleteRefreshToken(refreshToken);

            return {
            status: 'success',
            message: 'Refresh token berhasil dihapus',
            };
        } catch (error) {
            if (error instanceof ClientError) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(error.statusCode);
            return response;
            }

            // Server ERROR!
            const response = h.response({
            status: 'error',
            message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = AuthenticationsHandler;
