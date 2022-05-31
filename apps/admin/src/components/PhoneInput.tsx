import clsx from 'clsx';

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string | null;
  id: string;
}

export default function PhoneInput({
  error,
  label,
  id,
  ...props
}: PhoneInputProps) {
  return (
    <div className="form-control">
      <label htmlFor={id} className="label">
        <div className="label-text">{label}</div>
      </label>
      <label className="input-group">
        <span>+48</span>
        <input
          className={clsx('input flex-1', {
            'input-bordered focus:input-primary': !error,
            'input-error animate-wiggle': error,
          })}
          name={props.name ?? id}
          {...props}
        />
      </label>
      <div className="h-8 text-left">
        {error && <span className="text-error text-xs">{error}</span>}
      </div>
    </div>
  );
}
