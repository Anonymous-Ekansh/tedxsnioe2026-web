import ConfHeader from '../ConfDetailsHeader/ConfDetailsHeader';
import Speakers from '../Speakers/Speakers';
import useConf from '../../hooks/useConf';
import './ConferenceDetails.scss';
import React from 'react';
import Performers from '../Performers/Performers';
import { motion } from 'framer-motion';

function ConfDetails() {

    const details = [
        {
            title: "Through The Looking Glass",
            // TODO: Update the description and year and the image paths
            desc: "Even when gazing into the same reflection, stepping Through the Looking Glass reveals entirely new dimensions - urging us to invert our senses, question our minds, and bring what's dark into the light. For the 2024 conference, TEDxShivNadarUniversity brought together 9 speakers and 2 performers, each inviting the audience to confront the unknown, rediscover themselves, and see the world anew.",
            year: "2024",
            url: "placeholder insert yt link",
            speakers: [
                {
                    name: 'Ashvina Basnet',
                    profession: 'Human Trafficking Researcher',
                    image: '/Images/2024_speakers/Ashvina Basnet.png'
                },
                {
                    name: 'Humaira Mushtaq',
                    profession: 'First Female Indian Race Car Driver',
                    image: '/Images/2024_speakers/Humaira Mushtaq.png'
                },
                {
                    name: 'Samarth Mahajan',
                    profession: 'Filmmaker',
                    image: '/Images/2024_speakers/Samarth Mahajan.png'
                },
                
                {
                    name: 'Tanu Jain',
                    profession: 'Founder of Tathatsu ICS',
                    image: '/Images/2024_speakers/Tanu Jain.png'
                },
                {
                    name: 'Imon',
                    profession: 'Singer-Songwriter',
                    image: '/Images/2024_speakers/Imon.png'
                },
                {
                    name: 'Outkasts',
                    profession: 'K-Pop Dance Group',
                    image: '/Images/2024_speakers/Outkasts.png'
                },
                {
                    name: 'Deepak Kumar',
                    profession: 'Shooter, Asian Games Silver Medalist',
                    image: '/Images/2024_speakers/Deepak Kumar.png'
                },
                {
                    name: 'Sudhana Sankar',
                    profession: 'Classical Dancer',
                    image: '/Images/2024_speakers/Sudhana Sankar.png'
                },
                {
                    name: 'Pranay Lal',
                    profession: 'Author and Environmentalist',
                    image: '/Images/2024_speakers/Pranay Lal.png'
                },
                {
                    name: 'Vijaita Singh',
                    profession: 'Deputy Editor, The Hindu',
                    image: '/Images/2024_speakers/Vijaita Singh.jpg'
                },
                {
                    name: 'Khalid Wani',
                    profession: 'CEO & Founder, KWCG',
                    image: '/Images/2024_speakers/Khalid Wani.png'
                }
            ],
            images: [
                { url: '/Images/2024/2024_6.JPG' },
                { url: '/Images/2024/2024_7.JPG' },
                { url: '/Images/2024/2024_8.JPG' },
                { url: '/Images/2024/2024_9.JPG' },
                { url: '/Images/2024/2024_1.jpg' },
                { url: '/Images/2024/2024_11.JPG' },
                { url: '/Images/2024/2024_4.jpg' },
                { url: '/Images/2024/2024_2.jpg' },
                { url: '/Images/2024/2024_5.jpg' },
                { url: '/Images/2024/2024_12.JPG' },
                { url: '/Images/2024/2024_13.JPG' },
            ]
        },
        {
            title: "Kaleidoscope",
            desc: "Even for the same scenarios, turning the mirrors of perception yields unique patterns, reminding us to continually adapt our lens and embrace the ever-changing landscape before us. For the 2023 conference, TEDxShivNadarUniversity brought together 7 speakers and 3 performers all with wonderfully different ideas who conveyed to the audience that life is indeed about perspective!",
            year: "2023",
            url: "https://www.youtube.com/watch?v=55QuxoQRGc0",
            speakers: [
                {
                    name: 'Shirish Beri',
                    profession: 'Architect',
                    image: '/Images/2023_speakers/shirish.jpg'
                },
                {
                    name: 'Seema Rao',
                    profession: 'Commando Trainer',
                    image: '/Images/2023_speakers/seema-rao-2.jpg'
                },
                {
                    name: 'Gursakhi Lugani',
                    profession: 'Sustainable Fashion Designer',
                    image: '/Images/2023_speakers/gursakhi.jpg'
                },
                {
                    name: 'Rishab Jain',
                    profession: 'Finance Advisor, YouTuber',
                    image: '/Images/2023_speakers/rishab.png'
                },
                {
                    name: 'Bhanupriya Rao',
                    profession: 'Activist',
                    image: '/Images/2023_speakers/bhanu.jpg'
                },
                {
                    name: 'Debojyoti Chakraborty',
                    profession: 'Diversity strategist',
                    image: '/Images/2023_speakers/deb.jpg'
                },
                {
                    name: 'Aastha Khanna',
                    profession: 'Intimacy Coordinator',
                    image: '/Images/2023_speakers/aastha.jpg'
                },
                {
                    name: 'Aashima Mahajan',
                    profession: 'Singer',
                    image: '/Images/2023_speakers/aashima.jpg'
                },
                {
                    name: 'Anurita Jha',
                    profession: 'Actress',
                    image: '/Images/2023_speakers/Anuritta.jpg'
                },
                {
                    name: 'Anubha Bajaj',
                    profession: 'Singer',
                    image: '/Images/2023_speakers/anubha_bajaj.jpeg'
                }
            ],
            images: [
                { url: '/Images/2023/2023_1.jpg' },
                { url: '/Images/2023/2023_2.jpg' },
                { url: '/Images/2023/2023_3.jpg' },
                { url: '/Images/2023/2023_4.jpg' },
                { url: '/Images/2023/2023_5.jpg' },
                { url: '/Images/2023/2023_6.jpg' },
                { url: '/Images/2023/2023_7.jpg' },
                { url: '/Images/2023/2023_8.jpg' },
                { url: '/Images/2023/2023_9.jpg' },
                { url: '/Images/2023/2023_10.jpg' },
                { url: '/Images/2023/2023_11.jpg' },
            ]
        },
        {
            title: "Misfits",
            desc: "Misfits are people whose ideas and initiatives set them apart from the crowd, and they have the courage to do something different and make a difference. For the 2022 conference, TEDxShivNadarUniversity brought together 13 people who embody this definition.",
            year: "2022",
            url: "https://youtu.be/txqzy5Dwtww?si=C_AWV6tUjzGh8372",
            speakers: [{
                name: 'Kavitha Emmanuel',
                profession: 'Anti-colourism activist',
                image: '/Images/2022_speakers/kavitha.JPG'
            },
            {
                name: 'Vanika Sangtani',
                profession: 'Storyteller',
                image: '/Images/2022_speakers/vanika.JPG'
            },
            {
                name: 'Chinab',
                profession: 'Illustrator, political artist',
                image: '/Images/2022_speakers/chinab.JPG'
            },
            {
                name: 'Anurag Vashisht',
                profession: 'Singer',
                image: '/Images/2022_speakers/anurag123.jpg'
            },
            {
                name: 'Prachi Thakur',
                profession: 'Diversity strategist',
                image: '/Images/2022_speakers/prachi.JPG'
            },
            {
                name: 'Ritika Khatnani',
                profession: 'Miss Supernational Asia 2022',
                image: '/Images/2022_speakers/ritika.JPG'
            },
            {
                name: 'Himanshu Rai',
                profession: 'Author',
                image: '/Images/2022_speakers/himanshu.JPG'
            },
            {
                name: 'Sudhir R',
                profession: 'Fluteboxer',
                image: '/Images/2022_speakers/sudhir.JPG'
            },
            {
                name: 'Brindali Patel',
                profession: 'Dancer',
                image: '/Images/2022_speakers/Brindali.JPG'
            },
            {
                name: 'Dr. Sanjeev Bagai',
                profession: 'Doctor, Padma Bhushan',
                image: '/Images/2022_speakers/sanjeev.JPG'
            },
            {
                name: 'Priyanshu Grover',
                profession: 'Lawyer',
                image: '/Images/2022_speakers/priyanshu.JPG'
            },
            {
                name: 'Nafisa Rachel William',
                profession: 'Celebrity designer',
                image: '/Images/2022_speakers/Nafisa.JPG'
            },
            {
                name: 'Vineet Panchhi',
                profession: 'Poet and filmmaker',
                image: '/Images/2022_speakers/vineet.jpg'
            }
        ],
            images: [
                { url: '/Images/2022/2022_1.jpg' },
                { url: '/Images/2022/2022_2.jpg' },
                { url: '/Images/2022/2022_3.jpg' },
                { url: '/Images/2022/2022_4.jpg' },
                { url: '/Images/2022/2022_5.jpg' },
            ]
        },
        {
            title: "Rewire",
            desc: "This conference put the spotlight on 10 people from across India who had the courage to break away from convention and create change, thus inspiring others to do something different in their life",
            year: "2021",
            speakers: [
                {
                    name: 'Ayushmaan',
                    profession: 'Drag performer, human rights lawyer',
                    image: '/Images/2021_speakers/ayushmaan.JPG'
                },
                {
                    name: 'Samriddhi and Japnit',
                    profession: 'Founders of The Girl Code',
                    image: '/Images/2021_speakers/girlcode.JPG'
                },
                {
                    name: 'Aakriti Kumar',
                    profession: 'Founder, differniture',
                    image: '/Images/2021_speakers/akriti.JPG'
                },
                {
                    name: 'Shrishti Pandey',
                    profession: 'Disability rights activist',
                    image: '/Images/2021_speakers/srishti.JPG'
                },
                {
                    name: 'Radhika Khandelwal',
                    profession: 'Chef',
                    image: '/Images/2021_speakers/radhika.JPG'
                },
                {
                    name: 'Vatsala Mamgain',
                    profession: 'Director of Resource Mobilization at Child Rights and You, CRY',
                    image: '/Images/2021_speakers/vatsala.JPG'
                },
                {
                    name: 'Rumi Aijaz',
                    profession: 'Senior fellow, ORF',
                    image: '/Images/2021_speakers/rumi.JPG'
                },
                {
                    name: 'Shrutika Vats',
                    profession: 'Cofounder, QLC',
                    image: '/Images/2021_speakers/shruti.JPG'
                },
                {
                    name: 'Autoplay',
                    profession: 'Musicians',
                    image: '/Images/2021_speakers/perf_autoplay.JPG'
                },
                {
                    name: 'Anureet',
                    profession: 'Poet',
                    image: '/Images/2021_speakers/anureet.JPG'
                }
            ],
            images: [
                { url: '/Images/2021/2021_1.jpg' },
                { url: '/Images/2021/2021_2.jpg' },
                { url: '/Images/2021/2021_3.jpg' },
                { url: '/Images/2021/2021_4.jpg' },
                { url: '/Images/2021/2021_5.jpg' },
                { url: '/Images/2021/2021_6.jpg' },
            ]
        },
        {
            title: "BlindSpots",
            desc: "11 speakers and 3 performers took the stage and shed light on the topics that are often ignored by many and gave the audience an insight into fields that are relatively unexplored",
            year: "2019",
            url: "https://youtu.be/0R82X_0_pt8?feature=shared",
            speakers: [
                {
                    name: 'Manit Ramaiya',
                    profession: 'Concept developer at Saint Gobain',
                    image: '/Images/2019_speakers/manit.jpg'
                },
                {
                    name: 'Chingmak Chang',
                    profession: 'Social entrepreneur',
                    image: '/Images/2019_speakers/chingmakchang.jpg'
                },
                {
                    name: 'Mahima Gujral Wadhwa',
                    profession: 'Chief Green Bee and Founder of Sui',
                    image: '/Images/2019_speakers/mahima.JPG'
                },
                {
                    name: 'Alim Chandani',
                    profession: 'Founder and CEO, Access Mantra',
                    image: '/Images/2019_speakers/ALIM.JPG'
                },
                {
                    name: 'Farheen Ahmad',
                    profession: 'Vlogger',
                    image: '/Images/2019_speakers/farheenahmed.png'
                },
                {
                    name: 'Ishaan Chowdhary',
                    profession: 'Spoken Word Poet',
                    image: '/Images/2019_speakers/manit.jpg'
                },
                {
                    name: 'Manisha Lath Gupta',
                    profession: 'Marketing Director at Uber, Permaculture farmer',
                    image: '/Images/2019_speakers/manisha.jpg'
                },
                {
                    name: 'Chaizai',
                    profession: 'Band',
                    image: '/Images/2019_speakers/chaizai.jpg'
                },
                {
                    name: 'Pradeepa Narayanaswamy',
                    profession: 'Fertility coach',
                    image: '/Images/2019_speakers/pradeepa.jpg'
                },
                {
                    name: 'Radhika Mitthal',
                    profession: 'Founder, Super School India',
                    image: '/Images/2019_speakers/radhika.jpg'
                },
                {
                    name: 'Sharath Jeevan',
                    profession: 'Founder and CEO, STIR Education',
                    image: '/Images/2019_speakers/sharath.jpg'
                },
                // {
                //     name: 'Manish Paul',
                //     profession: 'Television anchor',
                //     image: '/Images/Assets/dummy.png'
                // },
                {
                    name: 'Manish Gupta',
                    profession: 'Business coach',
                    image: '/Images/2019_speakers/manish.png'
                }
            ],
            images: [
                { url: '/Images/2019/2019_1.jpg' },
                { url: '/Images/2019/2019_2.jpg' },
                { url: '/Images/2019/2019_3.jpg' },
                { url: '/Images/2019/2019_4.jpg' },
                { url: '/Images/2019/2019_5.jpg' },
                { url: '/Images/2019/2019_6.jpg' },
            ]
        },
        {
            title: "Out of the Blue",
            desc: "This conference consisted of a star-studded speaker lineup with speakers like the legendary cricketer Kapil Dev, famous entrepreneur and mentor Ankur Warikoo, renowned Business woman Roshni Nadar and so many more renowned names from diverse fields. The conference was an experience of a lifetime for all those who witnessed it.",
            year: "2018",
            url: 'https://youtu.be/vt5byYQlvr0?feature=shared',
            speakers: [
                {
                    name: 'Vasu Primlani',
                    profession: 'Standup comedian',
                    image: '/Images/2018_speakers/vasu.jpg'
                },
                {
                    name: 'Ankur Warikoo',
                    profession: 'Cofounder, Nearby',
                    image: '/Images/2018_speakers/ankur.jpg'
                },
                {
                    name: 'Flavia Agnes',
                    profession: 'Lawyer',
                    image: '/Images/2018_speakers/flavia.jpg'
                },
                {
                    name: 'Harnidh Kaur',
                    profession: 'Poetess',
                    image: '/Images/2018_speakers/harnidh.jpg'
                },
                {
                    name: 'Sohail Hashmi',
                    profession: 'Historian',
                    image: '/Images/2018_speakers/sohail.jpg'
                },
                {
                    name: 'Karan Suri',
                    profession: 'Executive Director, Morgan Stanley',
                    image: '/Images/2018_speakers/karansuri.png'
                },
                {
                    name: 'Varun Bhal',
                    profession: 'Fashion designer',
                    image: '/Images/2018_speakers/varun.jpg'
                },
                {
                    name: 'Suman and Aarshi',
                    profession: 'Performers',
                    image: '/Images/2018_speakers/perf.jpg'
                },
                {
                    name: 'Roshini Nadar',
                    profession: 'CEO, HCL',
                    image: '/Images/2018_speakers/roshni.jpg'
                },
                {
                    name: 'Nila Mahab Panda',
                    profession: 'Producer',
                    image: '/Images/2018_speakers/nilab.jpg'
                },
                // {
                //     name: 'Aditya Bhandari',
                //     profession: 'Performer',
                //     image: '/Images/Assets/dummy.png'
                // },
                {
                    name: 'Kapil Dev',
                    profession: 'Cricketer',
                    image: '/Images/2018_speakers/kapildev.jpg'
                },
                {
                    name: 'Yogesh Saini',
                    profession: 'Founder, Delhi Street Art',
                    image: '/Images/2018_speakers/yogesh.jpg'
                },
                {
                    name: 'Nandita Das',
                    profession: 'Actress',
                    image: '/Images/2018_speakers/nandita.jpg'
                },
                {
                    name: 'NG Jayasimha',
                    profession: 'MD, Humane Society India',
                    image: '/Images/2018_speakers/ng.jpg'
                },
                {
                    name: 'Shoma Choudhary',
                    profession: 'Journalist',
                    image: '/Images/2018_speakers/Shoma.png'
                }
            ],
            images: [
                { url: '/Images/2018/2018_1.jpg' },
                { url: '/Images/2018/2018_2.jpg' },
                { url: '/Images/2018/2018_3.jpg' },
                { url: '/Images/2018/2018_4.jpg' },
                { url: '/Images/2018/2018_5.jpg' },
            ]
        },
        {
            title: "Ignite",
            desc: "This conference was as good if not better than its predecessor. Invited as speakers were 15 people and performers who helped open the window to understanding niche areas of business, art, education and much more. The experience was educationally and creatively enriching.",
            year: "2017",
            speakers: [
                {
                    name: 'Amitabh Mall',
                    profession: 'Partner at the Boston Consulting Group',
                    image: '/Images/2017_speakers/amitabh.jpg'
                },
                {
                    name: 'Biana Ghose',
                    profession: 'Corporate storyteller',
                    image: '/Images/2017_speakers/bianaghose.jpg'
                },
                {
                    name: 'Reema Ahmed',
                    profession: 'Sexuality educator',
                    image: '/Images/2017_speakers/reema.jpg'
                },
                {
                    name: 'Nikheel Aphale',
                    profession: 'Calligrapher',
                    image: '/Images/2017_speakers/nikheel.JPG'
                },
                {
                    name: 'Stalin. K',
                    profession: 'Film-maker',
                    image: '/Images/2017_speakers/stalin.jpg'
                },
                {
                    name: 'Reshma Valliappan',
                    profession: 'Artist and activist',
                    image: '/Images/2017_speakers/reshma.jpg'
                },
                // {
                //     name: 'Reecha Upadyay',
                //     profession: 'Social worker',
                //     image: '/Images/Assets/dummy.png'
                // },
                {
                    name: 'Abhineet Sonkar',
                    profession: 'Design thinking strategist',
                    image: '/Images/2017_speakers/abhijit.png'
                },
                {
                    name: 'Zorian',
                    profession: 'Cross-theatre artist',
                    image: '/Images/2017_speakers/zorian.jpg'
                },
                {
                    name: 'Sriram Raghavan',
                    profession: 'Director, IBM Research',
                    image: '/Images/2017_speakers/sriram.jpg'
                },
                {
                    name: 'Shreya Soni',
                    profession: 'Delhi Secret Supper Club',
                    image: '/Images/2017_speakers/shreya.JPG'
                },
                // {
                //     name: 'Shaili Chopra',
                //     profession: 'Journalist',
                //     image: '/Images/Assets/dummy.png'
                // },
                {
                    name: 'Sanjay Seth',
                    profession: 'Social activist',
                    image: '/Images/2017_speakers/sanjay.jpg'
                },
                {
                    name: 'Garima Agarwal',
                    profession: 'Rally racing driver',
                    image: '/Images/2017_speakers/garima.jpg'
                },
                {
                    name: 'Karan Vaish',
                    profession: 'System engineer, Team Indus',
                    image: '/Images/2017_speakers/karan.jpg'
                }
            ],
            images: [
                { url: '/Images/2017/2017_1.jpg' },
                { url: '/Images/2017/2017_2.jpg' },
                { url: '/Images/2017/2017_3.jpg' },
                { url: '/Images/2017/2017_4.jpg' },
                { url: '/Images/2017/2017_5.jpg' },
            ]
        },
        {
            title: "Conference",
            desc: "TEDxShivNadarUniversity 2016 conference hosted 13 speakers and artists from various professional and social fields. This conference was nothing short of a spectacle of stories and lessons from exceptional people which inspired and captivated everyone who witnessed it.",
            year: "2016",
            speakers: [
                {
                    name: 'Anahita Dhondy',
                    profession: 'Chef',
                    image: '/Images/2016_speakers/anahita.jpg'
                },
                {
                    name: 'Amrita Mahale',
                    profession: 'Rocket scientist turned author',
                    image: '/Images/2016_speakers/amrit.jpg'
                },
                {
                    name: 'Vaibhav Mehta',
                    profession: 'Photographer',
                    image: '/Images/2016_speakers/vaibhav.jpg'
                },
                {
                    name: 'Karan Singh',
                    profession: 'Illusionist',
                    image: '/Images/2016_speakers/karansingh.jpg'
                },
                {
                    name: 'Karuna Nundy',
                    profession: 'Advocate',
                    image: '/Images/2016_speakers/karuna.jpg'
                },
                {
                    name: 'Pavitra Mohan',
                    profession: 'Director of AMRIT Health Initiative of the Ajeevika Bureau',
                    image: '/Images/2016_speakers/pavitra.jpg'
                },
                {
                    name: 'Laura Quinn',
                    profession: 'Founder and Managing Director of the Creative Startup Do One Thing',
                    image: '/Images/2016_speakers/laura.jpg'
                },
                {
                    name: 'Dr. Shivkumar Kalyanaraman',
                    profession: 'Program Director of Special Initiatives in IBM Research - India',
                    image: '/Images/2016_speakers/shivkumar.jpg'
                },
                {
                    name: 'Dr. Isher Judge Ahluwalia',
                    profession: 'Indian Economist, Padma Bhushan',
                    image: '/Images/2016_speakers/isher.jpg'
                },
                {
                    name: 'Ramesh Menon',
                    profession: 'Author and Award-winning Journalist',
                    image: '/Images/2016_speakers/ramesh.jpg'
                },
                {
                    name: 'Udayan Baijal',
                    profession: 'Producer at the Jamuncollective',
                    image: '/Images/2016_speakers/udyan.jpg'
                },
                {
                    name: 'Raul Villamarin Rodriguez',
                    profession: 'Criminal Intelligence Officer at Interpol and Mossad',
                    image: '/Images/2016_speakers/raul.jpg'
                },
                {
                    name: 'Prof. Jagdeep S. Chhokar',
                    profession: 'Former Director In-charge of Indian Institute of Management',
                    image: '/Images/2016_speakers/jagdeep.jpg'
                }
            ],
            images: [
                { url: '/Images/2016/2016_1.jpg' },
                { url: '/Images/2016/2016_2.jpg' },
                { url: '/Images/2016/2016_3.jpg' },
                { url: '/Images/2016/2016_4.jpg' },
            ]
        },
    ]



    const { conference } = useConf();
    React.useEffect(() => {
        const element = document.getElementById(conference);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', "block": "start" });
        }
    }, [conference])
    return (
        <div className='ConfDetailsSection'>
            {details.map((item, index) => {
                return (
                    <div key={index}>
                        <div style={{ paddingTop: "3rem" }} id={'conf' + (index + 1)}></div>
                        <div className='ConfDetailsSection__conference'>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: .7 }}
                                key={index}
                            >
                                <div className='ConfDetailsSection__conference--header'>
                                    <ConfHeader images={item.images} title={item.title} year={item.year} desc={item.desc} url={item.url} />
                                </div>
                            </motion.div>
                            <div className='ConfDetailsSection__conference--speakers'>
                                <Speakers speakers={item.speakers} />
                            </div>
                            {/* <div className='ConfDetailsSection__conference--performers'>
                                <Performers />
                            </div> */}
                        </div>
                    </div>
                )
            })}
            {/* <div style={{ paddingTop: "3rem" }} id='conf1'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader title={details.title} year={details.year} desc={details.desc} />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
                <div className='ConfDetailsSection__conference--performers'>
                    <Performers />
                </div>
            </div>
            <div style={{ paddingTop: "3rem" }} id='conf2'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
            </div>
            <div style={{ paddingTop: "3rem" }} id='conf3'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
            </div>
            <div style={{ paddingTop: "3rem" }} id='conf4'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
            </div>
            <div style={{ paddingTop: "3rem" }} id='conf5'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
            </div>
            <div style={{ paddingTop: "3rem" }} id='conf6'></div>
            <div className='ConfDetailsSection__conference'>
                <div className='ConfDetailsSection__conference--header'>
                    <ConfHeader />
                </div>
                <div className='ConfDetailsSection__conference--speakers'>
                    <Speakers />
                </div>
            </div> */}
        </div>
    )
}

export default ConfDetails;