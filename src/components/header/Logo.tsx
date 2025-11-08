const Logo = ({ logoUrl }: { logoUrl: string }) => {
  return (
    <div>
      <img
        src={logoUrl}
        height="50px"
        width="50px"
        alt="logo"
        className="rounded"
      />
    </div>
  );
};

export default Logo;
