"use client";

import { useEffect, useState } from "react";
import { COURSE_LEVELS, toCourseUpdate, type BackendCourse, type BackendCourseCategory, type BackendCourseSection, type BackendCourseUpdate } from "@/lib/backend-course-types";

type BackendResponse =
  | { configured: false; writable: false; message: string }
  | { configured: true; writable: boolean; course: BackendCourse; sections: BackendCourseSection[]; category: BackendCourseCategory | null };

function TextField({ name, value, onChange, multiline=false }: {
  name: string; value: string; onChange: (value: string) => void; multiline?:boolean;
}) {
  return <label className="roac-editor-field"><span>{name}</span>
    {multiline ? <textarea rows={3} value={value} onChange={e=>onChange(e.target.value)} /> : <input value={value} onChange={e=>onChange(e.target.value)}/>}
  </label>;
}
const listText = (values: string[] | undefined) => (values || []).join("\n");
const parseText = (value: string) => value.split(/\r?\n/).map(s=>s.trim()).filter(Boolean);

export default function BackendCoursePanel({ slug }: { slug: string }) {
  const [record,setRecord] = useState<BackendCourse | null>(null);
  const [category,setCategory] = useState<BackendCourseCategory | null>(null);
  const [sections,setSections] = useState<BackendCourseSection[]>([]);
  const [draft,setDraft] = useState<BackendCourseUpdate | null>(null);
  const [notice,setNotice] = useState("Loading backend model...");
  const [writable,setWritable] = useState(false);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [dirty,setDirty] = useState(false);

  useEffect(()=>{
    let cancelled=false;
    (async()=>{
      setLoading(true);setNotice("");setRecord(null);setDraft(null);setDirty(false);
      try {
        const res=await fetch(`/api/admin/backend-course?slug=${encodeURIComponent(slug)}`,{cache:"no-store"});
        const data=await res.json() as BackendResponse | {error:string};
        if(cancelled)return;
        if(!res.ok){setNotice("error" in data ? data.error : "Unable to access course backend");return;}
        if(!data.configured){setNotice(data.message);return;}
        setRecord(data.course);
        setDraft(toCourseUpdate(data.course));
        setCategory(data.category);
        setSections(data.sections || []);
        setWritable(data.writable);
        if(!data.writable)setNotice("Read-only: backend update route/token not configured. These are your existing Sequelize Course fields.");
      } catch { if(!cancelled)setNotice("Cannot reach your existing course backend."); }
      finally {if(!cancelled)setLoading(false);}
    })();
    return()=>{cancelled=true;};
  },[slug]);

  function edit<K extends keyof BackendCourseUpdate>(key: K, value: BackendCourseUpdate[K]) {
    setDraft(prev => prev ? {...prev,[key]:value} : prev);
    setDirty(true);setNotice("");
  }
  const save=async()=>{
    if(!record || !draft || !writable || saving)return;
    setSaving(true);setNotice("");
    try{
      const res=await fetch("/api/admin/backend-course",{
        method:"PATCH",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({id:record.id,slug:record.slug,update:draft}),
      });
      const data=await res.json() as {error?:string};
      if(!res.ok)throw Error(data.error || "Backend rejected update");
      setRecord({...record,...draft});setDirty(false);
      setNotice("Backend course fields updated. Refresh the public landing page to see supported fields.");
    }catch(e){setNotice(e instanceof Error?e.message:"Save failed");}
    finally{setSaving(false);}
  };

  if(loading)return <p className="roac-editor-hint">{notice}</p>;
  if(!record || !draft)return <div className="roac-editor-fields"><h2>Existing Course Backend</h2><p className="roac-editor-alert">{notice}</p><p className="roac-editor-hint">The uploaded model files define database fields but not route URLs. Set the actual backend endpoint paths in Vercel before enabling this section.</p></div>;

  return <div className="roac-editor-fields">
    <h2>Existing Course Model</h2>
    <p className="roac-editor-hint">These names match Course.js. Student enrollment, payment fields, and counters are intentionally read-only.</p>
    <div className="roac-editor-item">
      <div className="roac-editor-meta"><span>Course ID</span><strong>{record.id}</strong></div>
      <div className="roac-editor-meta"><span>slug</span><strong>{record.slug}</strong></div>
      <div className="roac-editor-meta"><span>status</span><strong>{record.status}</strong></div>
      <div className="roac-editor-meta"><span>isPublished</span><strong>{String(record.isPublished)}</strong></div>
      <div className="roac-editor-meta"><span>isUnlisted</span><strong>{String(record.isUnlisted)}</strong></div>
      <div className="roac-editor-meta"><span>categoryId</span><strong>{category?.name || record.categoryId || "—"}</strong></div>
      <div className="roac-editor-meta"><span>instructorId</span><strong>{record.instructorId}</strong></div>
    </div>
    <TextField name="title" value={draft.title} onChange={v=>edit("title",v)}/>
    <TextField name="subtitle" value={draft.subtitle || ""} onChange={v=>edit("subtitle",v || null)}/>
    <TextField name="description" value={draft.description || ""} multiline onChange={v=>edit("description",v || null)}/>
    <TextField name="thumbnail" value={draft.thumbnail || ""} onChange={v=>edit("thumbnail",v || null)}/>
    <TextField name="previewVideo" value={draft.previewVideo || ""} onChange={v=>edit("previewVideo",v || null)}/>
    <label className="roac-editor-field"><span>level</span><select value={draft.level} onChange={e=>edit("level",e.target.value as BackendCourse["level"])}>{COURSE_LEVELS.map(l=><option key={l} value={l}>{l}</option>)}</select></label>
    <TextField name="language" value={draft.language} onChange={v=>edit("language",v)}/>
    {(["benefits","requirements","whatYouLearn","tags","targetAudience"] as const).map(key=><TextField key={key} name={key+" (one item per line)"} multiline value={listText(draft[key])} onChange={v=>edit(key,parseText(v))}/>)}

    <div className="roac-editor-item">
      <strong>Course settings and metrics (read-only)</strong>
      {(["isFree","price","discountPrice","currency","totalLessons","totalSections","totalDurationMins","totalEnrollments","totalRatings","averageRating","hasCertificate","hasQuizzes","hasAssignments","accessDurationDays"] as const).map(key=>
        <div className="roac-editor-meta" key={key}><span>{key}</span><strong>{String(record[key]??"—")}</strong></div>)}
      <p className="roac-editor-hint">Pricing/payment/access rules must be changed through the existing authenticated course admin controllers, not the landing page designer.</p>
    </div>

    <h2>CourseSection records</h2>
    <p className="roac-editor-hint">These records come from CourseSection.js, ordered by the backend `order` field. Published sections are reflected on the public curriculum.</p>
    {sections.length ? sections.slice().sort((a,b)=>a.order-b.order).map(section=><div className="roac-editor-item" key={section.id}>
      <strong>{section.order+1}. {section.title}</strong>
      <p className="roac-editor-hint">{section.description || ""}</p>
      <p className="roac-editor-hint">isPublished: {String(section.isPublished)} · totalLessons: {section.totalLessons} · totalDurationMins: {section.totalDurationMins}</p>
    </div>) : <p className="roac-editor-hint">No CourseSection records were included in the backend course response.</p>}
    {notice && <p className={notice.startsWith("Backend course fields updated")?"roac-editor-success":"roac-editor-alert"} role="status">{notice}</p>}
    <div className="roac-editor-actionrow">
      <span>{dirty?"● Unpublished backend edits":"Backend fields unchanged"}</span>
      <button onClick={save} disabled={!writable || !dirty || saving}>{saving?"Saving…":"Save Course fields"}</button>
    </div>
  </div>;
}
