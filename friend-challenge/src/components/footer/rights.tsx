export const Rights = () => {
  const appName: string = process.env.APP_NAME as string;
  const year: number = new Date().getFullYear();
  const rights: string = `© ${year} ${appName}. All rights reserved.`;

  return (
    <footer className="text-sm text-center p-2">
      <p>{rights}</p>
    </footer>
  );
};
