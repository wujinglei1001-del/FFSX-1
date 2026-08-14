import { users } from 'data/users';

export const tasksPerGroup = 4;

export const labelOptions = ['Feature', 'Bug', 'Issue'];

export const getNextTaskId = (tasks) => {
  const max = Math.max(
    0,
    ...tasks
      .map((task) => parseInt((task?.id ?? '').replace(/^task-/, ''), 10))
      .filter((parsedNumber) => !Number.isNaN(parsedNumber)),
  );
  return `task-${max + 1}`;
};

export const getInitials = (fullName) => {
  return (fullName || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');
};

export const getAvatarItems = (collaborators) => {
  return collaborators
    .filter((collaborator) =>
      Boolean(collaborator?.email || typeof collaborator?.userId === 'number'),
    )
    .map((collaborator) => {
      const email = (collaborator.email || '').toLowerCase();
      const matchedUser = users.find((user) => user.email.toLowerCase() === email);
      const name = collaborator.name || matchedUser?.name || collaborator.email;
      const avatarUrl = collaborator.avatar || matchedUser?.avatar || '';

      return {
        key: `user-${collaborator.userId}`,
        name,
        avatarUrl,
        initials: getInitials(name),
      };
    });
};
