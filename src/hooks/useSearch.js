export default function useSearch(tasks,text){
    const lowerText = text.toLowerCase();
    
    return tasks.filter(t=>{
        return t.title.toLowerCase().includes(lowerText)
        || t.text.toLowerCase().includes(lowerText);
    });
}