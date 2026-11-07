const tools = [
  {name:"Ollama",category:"Build",tag:"Run models locally",icon:"O",desc:"Explore running open models on your own computer. Hardware requirements vary.",url:"https://ollama.com"},
  {name:"Hugging Face",category:"Create",tag:"AI community",icon:"H",desc:"Discover open models, datasets, demos, and community projects.",url:"https://huggingface.co"},
  {name:"Google AI Studio",category:"AI assistant",tag:"Experiment",icon:"G",desc:"Experiment with Google's AI models. Check current access and usage limits.",url:"https://aistudio.google.com"},
  {name:"Perplexity",category:"AI assistant",tag:"Research",icon:"P",desc:"Explore an AI-powered answer and research experience. Verify plan limits.",url:"https://www.perplexity.ai"},
  {name:"Canva",category:"Create",tag:"Visual design",icon:"C",desc:"Create presentations, graphics, and visual materials. Some features are paid.",url:"https://www.canva.com"},
  {name:"freeCodeCamp",category:"Learn",tag:"Learn to code",icon:"F",desc:"Practice programming and web development through free learning resources.",url:"https://www.freecodecamp.org"},
  {name:"Khan Academy",category:"Learn",tag:"Learning",icon:"K",desc:"Study a wide range of subjects with structured lessons and practice.",url:"https://www.khanacademy.org"},
  {name:"GitHub",category:"Build",tag:"Build in public",icon:"⌘",desc:"Host code, collaborate on projects, and learn from open-source communities.",url:"https://github.com"}
];
let activeFilter = "All";
const grid = document.querySelector("#tool-grid");
const search = document.querySelector("#search");
const count = document.querySelector("#result-count");

function render() {
  const term = search.value.trim().toLowerCase();
  const filtered = tools.filter(tool => {
    const matchesCategory = activeFilter === "All" ||
      (activeFilter === "Create" ? tool.category === "Create" :
       activeFilter === "Build" ? tool.category === "Build" :
       activeFilter === "Learn" ? tool.category === "Learn" :
       tool.category === "AI assistant");
    const matchesSearch = `${tool.name} ${tool.category} ${tool.tag} ${tool.desc}`.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
  count.textContent = filtered.length;
  grid.innerHTML = filtered.length ? filtered.map(tool => `
    <article class="tool-card">
      <div class="tool-top"><div class="tool-icon">${tool.icon}</div><span class="tool-tag">${tool.tag}</span></div>
      <h3>${tool.name}</h3><p>${tool.desc}</p>
      <a href="${tool.url}" target="_blank" rel="noopener noreferrer">Visit official website ↗</a>
    </article>`).join("") : `<p class="muted">No matches yet. Try another search.</p>`;
}
document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".filter.active")?.classList.remove("active");
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    render();
  });
});
search.addEventListener("input", render);
render();
