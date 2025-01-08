import beeLogo from '../assets/logo_bee1.png';

export function Logo() {
  return (
    <div className="flex items-center justify-center">
      <img 
        src={beeLogo}
        alt="Bee Logo" 
        className="mx-auto h-24 w-auto"
      />
    </div>
  );
}