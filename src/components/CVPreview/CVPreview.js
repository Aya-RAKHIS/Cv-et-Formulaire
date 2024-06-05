import { forwardRef } from 'react';
import { useCV } from '../../contexts/CVContext';

import Header from './Header';
import Education from './Education';
import Skills from './Skills';
import Awards from './Awards';
import GeneralInfo from './GeneralInfo';
import Experience from './Experience';
import Interests from './Interests';

import classes from './CVPreview.module.css';

const CVPreview = forwardRef((props, ref) => {
  const { generalInfo, skills, education, experience, awards } = useCV();

  // Construction de l'URL de la photo
  const photoURL = process.env.PUBLIC_URL + '/images/PHOTOCVHTML.jpg';

  return (
    <section className={classes['cv-preview']} ref={ref}>
      <Header info={generalInfo} photo={photoURL} />
      <hr />
      <main className={classes.main}>
        <div className={classes['main-left']}>
          <Education education={education} />
          <hr />
          <Skills skills={skills} />
          <hr />
          <Awards awards={awards} />
        </div>
        <div className={classes['vertical-line']}></div>
        <div className={classes['main-right']}>
          <GeneralInfo generalInfo={generalInfo} />
          <hr />
          <Experience experience={experience} />
          <hr />
          <Interests />
        </div>
      </main>
    </section>
  );
});

export default CVPreview;