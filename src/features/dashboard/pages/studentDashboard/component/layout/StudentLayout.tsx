import {  Outlet } from "react-router-dom";

export default function StudentLayout() {
  return (
    <div className="flex min-h-screen bg-muted/40">

      <div className="flex flex-col flex-1"> 
        <main className="bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
