import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
  error?: string | null;
  id: string;
}

export default function Input({ error, id, label, ...props }: InputProps) {
  return (
    <div className="form-control relative pb-4">
      <label htmlFor={id} className="label">
        <div className="label-text">{label}</div>
      </label>
      <input
        className={clsx('input', {
          'input-bordered focus:input-primary': !error,
          'input-error animate-wiggle': error,
        })}
        name={props.name ?? id}
        {...props}
      />
      <div className="absolute -bottom-3 h-8 w-full text-right">
        {error && <span className="text-error text-xs">{error}</span>}
      </div>
    </div>
  );
}
