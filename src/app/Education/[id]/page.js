"use client"
import { useRouter } from 'next/navigation';
import ModuleComponent from '@/app/Components/Module';
import { module_1, module_2, module_3,module_4,module_5,module_6,module_7,module_8 } from '@/app/utils/info';
import { Link } from '@mui/material';

const ModulePage = () => {
  const router = useRouter();
  const path = window.location.pathname;


  return (
    <div>
   {/* {path === '/Education/1' && <ModuleComponent module={module_1} />}
   {path === '/Education/2' && <ModuleComponent module={module_2} />}
   {path === '/Education/3' && <ModuleComponent module={module_3} />}
   {path === '/Education/4' && <ModuleComponent module={module_4} />}
    {path === '/Education/5' && <ModuleComponent module={module_5} />}
    {path === '/Education/6' && <ModuleComponent module={module_6} />}
    {path === '/Education/7' && <ModuleComponent module={module_7} />}
    {path === '/Education/8' && <ModuleComponent module={module_8} />} */}
    {path === '/Education/1' && <ModuleComponent module={module_1} no={1}/> }
   {path === '/Education/2' && <ModuleComponent module={module_2} />}
   {path === '/Education/3' && <ModuleComponent module={module_3} />}
   {path === '/Education/4' && <ModuleComponent module={module_4} />}
    {path === '/Education/5' && <ModuleComponent module={module_5} />}
    {path === '/Education/6' && <ModuleComponent module={module_6} />}
    {path === '/Education/7' && <ModuleComponent module={module_7} />}
    {path === '/Education/8' && <ModuleComponent module={module_8} />}

    </div>
  );
};

export default ModulePage;
