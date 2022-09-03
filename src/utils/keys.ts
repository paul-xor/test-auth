export const pageCacheKey = (id: string): string => `pagecache#${id}`;
export const usersKey = (userId: string): string => `users#${userId}`;

export const userNameUniqueKey = (): string => 'user:unique';
