import { sounds } from '../../utils/soundEffects';

export default function CartridgeSelectorBar({ projects, selectedProject, onSelectProject }) {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-20 w-full max-w-4xl px-4 overflow-x-auto py-2 flex items-center justify-center gap-2 sm:gap-3 no-scrollbar">
      {projects.map((project) => {
        const isSelected = selectedProject?.id === project.id;
        const identityColor = project.color || '#2EF2FF';

        return (
          <button
            key={project.id}
            onClick={() => {
              sounds.playCartridgeInsert();
              onSelectProject(project);
            }}
            className={`group relative flex-shrink-0 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl border transition-all duration-300 flex items-center gap-2 cursor-pointer ${
              isSelected
                ? "bg-[#16161E] scale-105 shadow-[0_0_20px_rgba(255,46,209,0.5)] border-[#FF2ED1]"
                : "bg-[#16161E]/80 hover:bg-[#16161E] border-white/10 hover:border-white/30"
            }`}
            style={{
              borderColor: isSelected ? identityColor : undefined
            }}
          >
            {/* Color Tag Indicator */}
            <div
              className="w-2.5 h-7 rounded-sm shadow-sm flex-shrink-0"
              style={{ backgroundColor: identityColor }}
            />

            <div className="text-left">
              <span
                className="block font-pixel text-[9px] sm:text-[10px] tracking-wide"
                style={{ color: isSelected ? identityColor : '#E4F2E4' }}
              >
                {project.title.toUpperCase()}
              </span>
              <span className="block font-mono text-[8px] sm:text-[9px] text-[#6E7A6E]">
                ESRB: {project.complexity} • {project.releaseYear}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
