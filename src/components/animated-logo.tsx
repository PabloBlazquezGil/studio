export default function AnimatedLogo() {
    const name = "Pablo Blázquez Gil";
    return (
        <div>
            <h1 className="flex overflow-hidden font-headline text-2xl" aria-label={name}>
                {name.split('').map((char, index) => (
                    <span
                        key={index}
                        className="animate-fade-in-up opacity-0"
                        style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                        aria-hidden="true"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h1>
            <p 
                className="text-xs uppercase tracking-widest text-muted-foreground animate-fade-in-up opacity-0 font-normal"
                style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
            >
                Fotografía y Vídeo
            </p>
        </div>
    );
}
