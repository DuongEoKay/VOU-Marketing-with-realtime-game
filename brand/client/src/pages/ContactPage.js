import React from "react";
import styled from "styled-components";
import Layout from "../components/layout/Layout";

const ContactPageStyles = styled.div`
  .intro {
    display: flex;
    align-items: center;
    justify-content: center;
    .team {
      color: ${(props) => props.theme.primary};
    }
  }

  .founder {
    margin-top: 4rem;
  }

  .founder_card {
    border-radius: 2rem;
    padding: 1rem;
    text-align: center;
    background-color: #fff; /* Add background color for better visibility */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .top {
    position: relative;
    border-radius: 2rem;
    width: 100%;
    height: 180px;
    background-color: ${(props) => props.theme.primary};
  }

  .avt {
    position: absolute;
    border: 4px solid white;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(50%);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }

  .bot {
    margin-top: 5rem;

    .line {
      height: 1.5px;
      background-color: ${(props) => props.theme.primary};
    }

    .desc {
      margin-top: 0.5rem;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 1.5rem;
  }

  @media (max-width: 1200px) {
    .grid-layout {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media (max-width: 900px) {
    .grid-layout {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 600px) {
    .grid-layout {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 400px) {
    .grid-layout {
      grid-template-columns: 1fr;
    }
  }
`;

const founderData = [
  {
    name: "Huynh Son Ha",
    id: "21127035",
    bio: "The magic you are looking for is in the work you are avoiding.",
    email: "hsha21@clc.fitus.edu.vn",
    position: "1",
    avatar: "https://i1.sndcdn.com/artworks-000402711558-6rxuaz-t500x500.jpg",
  },
  {
    name: "Tran Hoang Duy",
    id: "21127259",
    bio: "Your peace and well-being is important to your happiness. Protect it to the best of your ability.",
    email: "thduy21@clc.fitus.edu.vn",
    position: "2",
    avatar: "https://i.pinimg.com/originals/4d/86/5e/4d865ea47a8675d682ff35ad904a0af6.png",
  },
  {
    name: "Nguyen Van Tuan Kiet",
    id: "21127331",
    bio: "It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable",
    email: "nvtkiet21@clc.fitus.edu.vn",
    position: "3",
    avatar: "https://img.freepik.com/premium-photo/kakashi-hatake_964328-36.jpg",
  },
  {
    name: "Le Van Duong",
    id: "21127500",
    bio: "Dream. Then make sure to take actions towards your dreams.",
    email: "lvduong21@clc.fitus.edu.vn",
    position: "4",
    avatar: "https://www.alucare.fr/wp-content/uploads/2023/08/Naruto-scaled.jpg",
  },
  {
    name: "Hoang Tran Thong",
    id: "21127695",
    bio: "If not me, then who?",
    email: "htthong21@clc.fitus.edu.vn",
    position: "5",
    avatar: "https://wallpapers.com/images/high/one-punch-man-bang-1034-x-844-wallpaper-e3tmagkwam6k1uxs.webp",
  },
];

const ContactPage = () => {
  return (
    <ContactPageStyles>
      <Layout isHomePage={true}>
        <div className="container">
          <div className="mt-10 intro">
            <div className="text-4xl team">The Skibidi Team</div>
          </div>
          <div className="intro">
            <div className="mt-5">It's not over until We win!</div>
          </div>
          <div className="founder">
            <div className="grid-layout">
              {founderData.map((f) => (
                <div key={f.id} className="shadow-lg founder_card">
                  <div className="top">
                    <div className="avt">
                      <img src={f.avatar} alt="founderAvt" />
                    </div>
                  </div>
                  <div className="mb-3 bot">
                    <div className="flex items-center justify-center text-xl font-semibold username">
                      {f.name}
                    </div>
                    <div className="flex items-center justify-center text-sm font-semibold text-gray-400 position">
                      {f.position}
                    </div>
                    <div className="line w-[80%] mt-3 m-auto"></div>
                    <div className="text-xs desc">{f.bio}</div>
                    <div className="flex items-center justify-center gap-2 mt-5 email">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="16"
                        width="16"
                        viewBox="0 0 512 512"
                      >
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                      </svg>
                      <div className="text-xs text-center text-gray-500">
                        <a href={`mailto:${f.email}`}>{f.email}</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </ContactPageStyles>
  );
};

export default ContactPage;
