type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
      {children}
    </div>
  );
}