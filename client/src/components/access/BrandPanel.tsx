import { Activity, Heart, LockKeyhole } from 'lucide-react'

export function BrandPanel() {
  return (
    <section className="relative z-10 isolate flex min-h-[360px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#073b36] via-[#0b5148] to-[#126458] px-7 py-8 text-white shadow-[0_12px_28px_rgba(5,35,31,0.12)] sm:px-10 sm:py-10 lg:min-h-screen lg:px-14 lg:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute -right-[220px] -bottom-[230px] z-0 size-[625px] rounded-full border border-[#07dd2c3]/20">
        <span className="absolute left-1/2 top-1/2 size-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#07dd2c3]/20" />
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="grid size-14 shrink-0 place-items-center rounded-xl bg-white/10 text-[#8ee2d2] ring-1 ring-inset ring-white/15 backdrop-blur-sm">
          <Heart size={29} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-xl tracking-wide">
            Salud <strong className="font-bold text-[#8ee2d2]">Integral</strong>
          </span>
        </span>
      </div>

      <div className="relative z-10 max-w-xl py-14 lg:py-0">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100/30 bg-emerald-100/10 px-3 py-1.5 text-sm font-medium text-[#8ee2d2]">
          <LockKeyhole size={15} strokeWidth={1.8} aria-hidden="true" />
          Portal clínico seguro
        </p>
        <h1 className="intro-title max-w-lg text-[28px] font-semibold leading-tight sm:text-4xl lg:text-4xl xl:text-5xl">
          <span className="block whitespace-nowrap">Cuidamos la salud,</span>
          <span className="block whitespace-nowrap">conectamos personas.</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-7 text-emerald-50/80 sm:text-lg sm:leading-8">
          Gestión centralizada para nuestros centros, recursos y profesionales.
        </p>
      </div>

      <div className="relative z-10 flex items-center gap-2.5 pt-5 text-sm text-emerald-50/75">
        <Activity size={17} strokeWidth={1.7} aria-hidden="true" />
        <span>Información clínica protegida</span>
      </div>
    </section>
  )
}