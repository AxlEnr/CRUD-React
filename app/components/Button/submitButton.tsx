interface SubmitButtonProps {
  variant?: 'blue' | 'green' | 'wine' | 'amber';
  text?: string;
}

export default function SubmitButton({ variant = 'blue', text = 'Enviar' }: SubmitButtonProps) {
  const classMap = {
    blue: 'blue-button',
    green: 'green-button',
    wine: 'wine-button',
    amber: 'amber-button',
  };

  return (
    <button type="submit" className={classMap[variant]}>
      {text}
    </button>
  );
}
