import { useRef } from 'react';
import {
  Award,
  Briefcase,
  CheckCircle2,
  Download,
  GraduationCap,
  X
} from 'lucide-react';
import { DEVELOPER_INFO } from '../../data/developer';
import { PROJECTS } from '../../data/projects';
import { sounds } from '../../utils/soundEffects';

export default function ExportReportModal({ onClose }) {
  const printRef = useRef();

  const handlePrint = () => {
    sounds.playSelect();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03050A]/95 p-3 backdrop-blur-2xl animate-fadeIn sm:p-6">
      <div className="relative flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#00FF66]/35 bg-white shadow-[0_0_90px_rgba(0,0,0,0.9)]">
        <header className="no-print flex items-center justify-between gap-4 bg-[#070B12] px-4 py-4 text-white sm:px-6">
          <div className="min-w-0">
            <div className="mb-1 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FF66] shadow-[0_0_10px_#00FF66]" />
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-[#00FF66]">
                Recruiter transmission
              </span>
            </div>

            <h2 className="truncate font-pixel text-xs text-[#39FF14] sm:text-sm">
              RECRUITER GAME MANUAL // SUMMARY
            </h2>

            <p className="mt-1 font-mono text-[10px] text-gray-400 sm:text-xs">
              One-page technical profile and impact briefing
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-xl bg-[#39FF14] px-3 py-2 font-pixel text-[9px] text-black shadow-[0_0_18px_rgba(57,255,20,0.3)] hover:bg-[#32E010] sm:px-4 sm:text-xs"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">
                PRINT / DOWNLOAD PDF
              </span>
              <span className="sm:hidden">EXPORT</span>
            </button>

            <button
              onClick={() => {
                sounds.playSelect();
                onClose();
              }}
              className="rounded-xl border border-white/10 bg-white/5 p-2 text-gray-300 hover:bg-white/15 hover:text-white"
              aria-label="Close recruiter report"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </header>

        <div
          ref={printRef}
          className="overflow-y-auto bg-white p-5 font-sans text-sm text-gray-800 sm:p-8"
        >
          <section className="flex flex-col justify-between gap-5 border-b-2 border-gray-900 pb-5 sm:flex-row">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Available for high-impact engineering work
              </div>

              <h1 className="text-3xl font-black uppercase tracking-tight text-gray-950 sm:text-4xl">
                {DEVELOPER_INFO.name}
              </h1>

              <p className="mt-1 text-sm font-bold text-emerald-700">
                {DEVELOPER_INFO.title}
              </p>

              <p className="mt-2 text-xs text-gray-600">
                {DEVELOPER_INFO.location} · {DEVELOPER_INFO.yearsExperience}{' '}
                experience
              </p>
            </div>

            <div className="text-left text-xs text-gray-600 sm:text-right">
              <p>
                Email:{' '}
                <span className="font-semibold text-gray-900">
                  {DEVELOPER_INFO.email}
                </span>
              </p>

              <p>
                Phone:{' '}
                <span className="font-semibold text-gray-900">
                  {DEVELOPER_INFO.phone}
                </span>
              </p>

              <p>
                GitHub:{' '}
                <a
                  href={DEVELOPER_INFO.github}
                  className="font-semibold text-emerald-700"
                >
                  github.com/Pradeep-B28
                </a>
              </p>

              <p>
                LinkedIn:{' '}
                <a
                  href={DEVELOPER_INFO.linkedin}
                  className="font-semibold text-emerald-700"
                >
                  linkedin.com/in/pradeepb-2k
                </a>
              </p>
            </div>
          </section>

          <section className="mt-5">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
              <Award className="h-4 w-4 text-emerald-700" />
              Executive Summary
            </h3>

            <p className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs leading-relaxed text-gray-700">
              {DEVELOPER_INFO.tagline} L&D Lead and Full-Stack Architect with
              end-to-end program ownership across premier engineering
              institutions. Architected a campus-to-corporate learning
              ecosystem at VIT University that drove placement rates from 70%
              to 90%, impacting 6,000+ students. Led a 25-member trainer team
              and built 8 open-source software applications.
            </p>
          </section>

          <section className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-center">
              <span className="block text-[9px] font-black uppercase tracking-wider text-emerald-800">
                Placement Catalyst
              </span>
              <span className="mt-1 block text-xl font-black text-emerald-950">
                70% → 90%
              </span>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center">
              <span className="block text-[9px] font-black uppercase tracking-wider text-blue-800">
                Students Mentored
              </span>
              <span className="mt-1 block text-xl font-black text-blue-950">
                6,000+
              </span>
            </div>

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 text-center">
              <span className="block text-[9px] font-black uppercase tracking-wider text-purple-800">
                Open Source Projects
              </span>
              <span className="mt-1 block text-xl font-black text-purple-950">
                {PROJECTS.length}
              </span>
            </div>
          </section>

          <section className="mt-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
              <Briefcase className="h-4 w-4 text-emerald-700" />
              Project Portfolio Highlights
            </h3>

            <div className="grid gap-3 sm:grid-cols-2">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="rounded-xl border border-gray-200 bg-gray-50 p-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-xs font-black text-gray-900">
                      {project.title}
                    </h4>

                    <span className="shrink-0 rounded bg-gray-200 px-1.5 py-0.5 text-[9px] font-bold text-gray-700">
                      ESRB {project.complexity}
                    </span>
                  </div>

                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-gray-600">
                    {project.tagline}
                  </p>

                  <p className="mt-2 font-mono text-[9px] leading-relaxed text-emerald-700">
                    Tech: {project.techTags.slice(0, 4).join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6">
            <h3 className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
              <Briefcase className="h-4 w-4 text-emerald-700" />
              Work Experience Summary
            </h3>

            <div className="space-y-3">
              {DEVELOPER_INFO.experience.map((experience, index) => (
                <div
                  key={`${experience.role}-${index}`}
                  className="border-l-2 border-emerald-600 py-1 pl-3"
                >
                  <div className="flex flex-col justify-between gap-1 text-xs sm:flex-row">
                    <span className="font-bold text-gray-900">
                      {experience.role}
                    </span>

                    <span className="font-mono text-[10px] text-gray-500">
                      {experience.period}
                    </span>
                  </div>

                  <p className="mt-0.5 text-[11px] font-semibold text-emerald-700">
                    {experience.company}
                  </p>

                  <p className="mt-1 text-[11px] leading-relaxed text-gray-600">
                    {experience.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 grid gap-5 border-t border-gray-200 pt-5 sm:grid-cols-2">
            <div>
              <h3 className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                <GraduationCap className="h-4 w-4 text-emerald-700" />
                Education
              </h3>

              <div className="space-y-2">
                {DEVELOPER_INFO.education.map((education, index) => (
                  <div key={`${education.degree}-${index}`}>
                    <p className="text-xs font-bold text-gray-900">
                      {education.degree}
                    </p>
                    <p className="text-[11px] text-gray-600">
                      {education.institution} · {education.period}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-gray-500">
                <Award className="h-4 w-4 text-emerald-700" />
                Certifications
              </h3>

              <ul className="space-y-1">
                {DEVELOPER_INFO.certifications
                  .slice(0, 5)
                  .map((certification) => (
                    <li
                      key={certification}
                      className="text-[11px] leading-relaxed text-gray-600"
                    >
                      • {certification}
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}