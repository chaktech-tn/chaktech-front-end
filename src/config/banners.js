// Banner images configuration from chaktech.tn
import electromenager_banner from '@assets/img/banners/electromenager-banner.webp';
import pc_portable_banner from '@assets/img/banners/pc-portable-banner.jpg';
import smartphone_banner from '@assets/img/banners/smartphone-banner.png';

export const bannerImages = {
  electromenager: {
    image: electromenager_banner,
    title: 'Électroménager',
    link: '/shop?category=Electromenager',
    description: 'Découvrez notre large gamme d\'électroménager',
  },
  pcPortable: {
    image: pc_portable_banner,
    title: 'PC Portable',
    link: '/shop?category=Informatique',
    description: 'Découvrez nos larges gammes de PC Portables',
  },
  smartphone: {
    image: smartphone_banner,
    title: 'Smartphones & Tablettes',
    link: '/shop?category=Téléphonie et Tablette',
    description: 'Les meilleurs smartphones aux meilleurs prix',
  },
};

export default bannerImages;

