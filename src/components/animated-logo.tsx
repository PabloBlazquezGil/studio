import Image from 'next/image';

export default function AnimatedLogo() {
    return (
        <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 shadow-[0_0_15px_rgba(79,209,197,0.3)] bg-black flex items-center justify-center">
                <Image 
                    src="/logo_pbg.png" 
                    alt="Logo Pablo Blázquez Gil" 
                    fill
                    className="object-cover"
                />
            </div>
            <div className="hidden sm:block">
                <h1 className="font-headline text-xl" aria-label="Pablo Blázquez Gil">
                    Pablo Blázquez Gil
                </h1>
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#4FD1C5]">
                    Fotografía y Vídeo
                </p>
            </div>
        </div>
    );
}
