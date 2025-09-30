import './PastConfTitles.scss'
import useConf from '../../hooks/useConf';
import Image from 'next/image';

function PastConfTitles() {
    const { setConference , conference } = useConf();
    const handleClick = (value) => {
        setConference(value);
    }
    return (
        <div className='PastConfTitlesContainer'>
            <div onClick={() => handleClick('conf1')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2024</p>
                <p className='PastConfTitlesContainer__card--title'>Through The Looking Glass</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf2')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2023</p>
                <p className='PastConfTitlesContainer__card--title'>Kaleidoscope</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf3')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2022</p>
                <p className='PastConfTitlesContainer__card--title'>Misfits</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf4')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2021</p>
                <p className='PastConfTitlesContainer__card--title'>Rewire</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf5')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2019</p>
                <p className='PastConfTitlesContainer__card--title'>Blindspots</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf6')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2018</p>
                <p className='PastConfTitlesContainer__card--title'>conference</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf7')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2017</p>
                <p className='PastConfTitlesContainer__card--title'>conference</p>
            </div>
            <Image className='PastConfTitlesContainer__divider' src='/Images/divider.png' alt='Divider' width={20} height={20} />
            <div onClick={() => handleClick('conf8')} className='PastConfTitlesContainer__card'>
                <p className='PastConfTitlesContainer__card--year'>2016</p>
                <p className='PastConfTitlesContainer__card--title'>conference</p>
            </div>
        </div>
    )
}

export default PastConfTitles;