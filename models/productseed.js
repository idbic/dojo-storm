//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require('./connection')
const Product = require('./products')
const db = mongoose.connection



//////////////////////////////////////////////
// Data Seed
//////////////////////////////////////////////
db.on("open", () => {
const seedProducts = [
    {name: 'Gym Logo Tee', image: "https://lh3.googleusercontent.com/Lo52mCJYmbqYpJPaKFTG3v0vJJKyACud5viJDMBlFOeko02PEMtyR2EeNsxvrrL5vlisOtidH-p4NvV-Tx-s5hYRuB0wVtR6sYrqyu_DZMU2wnDTgyTgBJT5Fb0q0C0kQ9ocx8TcwyqZ2pfaydgYS_EbVnr8OpW_qMJ5ta3FHge_K9H4xKDMGO1Warly10TFQaZAbxMNw9PaQCTKb1pPGd7itI8Tehun03avi4KRBzzqtn7m-e7Ot04nAhvVWPDs8yJ0GIz_JnFO4mdVSI6HGBlwNyt8LfoktnxB_JNkvORTcRnQLqyX2O0ReBI0ebin86EMV5BvTFEeXLm96F64L-12wBg_aKr9TZ6h8QBAcOTiM-BZQGDA37deScnYHBBbWSEve7Fi9D2bY4ajve38cLbONR4LTgd3vHqrF-gVD3OX5-E3_2gXDh6tHvoa_dm0zCODNf2177RZ9SeJsmmpljhyZzoYaUlHk4bJo-nDYUuNgy2FJ2PXJMCXp83RtgchPSF3qtobi9jZwrtyO3qheT_4bT_a9nQJQ79rqNZdQpfKFrqWi319U_bi9ZQ83UzIqQMpBH88J7PjZlQ9wSXCGQG5dxLlHMeWjDmQjV_vNd-9Xfs5p0yhA1gkLJn_C9zS83LRh5h3WtHXLf-wBnKnrJQE3YjV1iGcZp7HRYQVcDmBJZRUIb-JjoA3SjyzpM2_aVh6LXlFrgm3EqoKD8EnSVRiShG9W778_aunr-osBPPE4GXab3IApUy8DStefi9J8yVmkZ2sxdRpDqPAo4x5gPuY_UNXpXo=w1000-h944-no?authuser=0", price: 25.00, description: '100% hand spun cotton T shirt. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday T-Shirts', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a tshirt benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Shorts', image: "https://lh3.googleusercontent.com/ndAc1BQrfZgodplpUAId1cyghRrst5JwixybQ-l9I4H8SL6MIDPeJ-dWavH0CJaYILW43M1tvS6pQm37BwWlu0E0KzU-aWh0gXe7bO5aXZyChOQ2_xUEaa43bbR3BuxgGdN4p-mLwOubQgB2jtSq0-Ec4otCFGKUtDCSjQunUXznQfZD0bvrrRIlDLeXXYk4Yg3PV5E0_W8pBHSEGiFpq6oM4wLmfUhBVu4Qu81x9gRUUzXjwFFahFu2DVEeLDoSpXJPhzTp746LsoOcOry43G4V7JOzKVbJMsFBMcbAHKuHSN92RApQzIqy3jAMjQ6OzjWoyjzvBI2xhDLcjsfpqoIenamu8f-t0fqfUypsoBfFegfVkMcYdcrJ4Yb7R6BgswEivck_be3f7NTUJxBRWoMUEv-W-KEH_QOwS4lZNseQggU6FOMr5fl9htnXrk1vErCPgjTFizJP4Bin9EIEyGWcF017CDrxxvDCHjnKTdOPu2xKjCmp0HqQ2nmEY0P25t0pzOds-osCg9tgFFxlK-OikGr0TDWaoaLWpARnP2tbDhXxn1JSbTaWFJDpM7S8Tv_AgKsDNDmPCLPJlfeVt4VqS5xriEGWwCdXjcPqR6yBKiV7iCBeajww_pttoQM65S9SuWJKvV-BJpcqqNPcJ8Qxuub4NZxvrXrI4dPjZhhf8J8IJVpDCpWTynvasozoHkS2w1PoXNHQ32WSVUjVpnMbFjx-BNUPV2DkuuMja7jdh4239iQL2T_H7g7uGoqYvsjWNyAOnUy5eXVySfnVDjqsv5DipHU=s991-no?authuser=0", price: 35.00, description: '100% hand spun cotton Grappling Shorts. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Shorts', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself shorts benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Spats', image: "https://lh3.googleusercontent.com/EdnNIFefl4Y0_flNTrp9jr3C3fswShK-y0Fo9JtRhXRalogpnEVn3Wqi_oxYTPSDRc2E4hoic6JKmgrYT65A4jCxtNxBzCE30LJ3gzemy2lhV45euR-URRlPGQ43TX6kNrelwQ6EOZEtK3E-5-e5ImNYP2Hp67rEqNXSWDJFL3xgbyY-osxgbuGrxhslIdFisyHBH1_haMceO2deixThl5Bep8LwBdtEk5lhL4whLDqIfjUoki92upwiRV2bs5aWq19xFY-tRk7bhPE8nH29vvLiFl_GIAH4UHOD-vRqSyMSWB6ZeyKhb1XbAPcJ70A69XYy03SRWC5-ndOQTwhFUBdfWuXAAyuIQMD48e2vvoRxK5IMaEYpcD86D0D8F7NaPEDhwgfVpRASqwMidTwyE3_8xJ_sggInTbd8neBPQXE_ZkpGaH5Q3ohgtznLaD5vVmgsLwJLA6qqVBCqhsGSYciDuiEpfRxvQlVZsFN1fUG61wG7_pZFDKARXGXDKMHW31r3RSnZp9eOhecT2pNQYIgPsMDV0LpVY6o0ZL_KmROoTGmY0qRtuZh5wZ9fGwMpzwoM2PCArNpueU8_jx7WWvcj4KAohgMkWpdHqwoGiVowLlQPHTmioLVsLH0bcGba5xuqFE9DL046N-ajM-JOuy284NNH9rnX29dCCSh_QvAcejNebCHN2CzMq6qGAvPBxt5j9koojJEnRETPNd7WtjeEL3ZoGzg2vpO-plDUU0NJURAaWOCEO-c0fkGR8JRwpsO9sYReGUf9XiphgF-6KC4iFDNu0BY=s235-no?authuser=0", price: 25.00, description: '100% hand spun cotton Grappling Spats. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Spats', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself spats benefitting the south african garden gnomes', truetosize: true},
    {name: 'Gym Logo Rash Guard', image: "https://lh3.googleusercontent.com/G3MhU639qwzLNXLiV9Ahk-v7-ox5PmsKtGAlBsb2PohEJx80oC-OZ8xFso8wYHan53TKRf00U3MCjyMRboaIA7V282HB5g9rsBll5DQd0nJesF4KtYpxcq6OTUy3qEaEIYEW26p-oITE95coINsTzqHdR5NSY0dDBqiDVXrWjhqOTX-owlhoryef4yUTdwVmvKPWjVn4XFjQwuaYS_Wm3u8LkA4hNwISG7tFsOx6oZ6jgzNvun9rUEH_iKWuxjbAlKAi5mGNAALmTRAyu3DGsLXkYseVPdOmdBVfk4AdJLDQM-PksVIaBuldvMVDSYgtENPt6ZviBbu90AY28rredlXDKutSRp5-YUriLgS_LSc6mvp2RtABR3JEeCIsVuFa5pdY97lKtURqFUQFY_zgbE6-poGGRjYsTnaFdgOeQ1t3mDkQnqCrmCVsCmZQA--IRnIgCsrnQeoyLsRP16JmCM6UED3yIFyRDYxfwNSCn9aPYo3e20_XFJ3HbKgWnqoG_Tc57E-nBo_Sv5rUA1YLRRYaGT9sxI5YBXeQjpBloesgIj7fveh26d-lPlrT7KdcaJdQY9GTLkVfvHt79xUej_kG1xIcVN4bsgF3BuWEqN3mJkYk90NKsBzsDMCAsQJ17T36Or5XyjTEjwJFPkHD4XfzL_PLwlC0KNiZN5VqoYf5o_-VNF6rVFDlUgHDwxAqOEGWJBvmMuQhWmx6zooc096xjltwlgaiScftWlo2F4AlZYWIDEHD21isOEbsvPCy-J9TSb8Xll_BqXCq-7QsKip6xMwQVCw=w675-h991-no?authuser=0", price: 30.00, description: '100% hand spun cotton rashguard. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday rashguards', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a rashguard benefitting the south african garden gnomes', truetosize: true},
    {name: 'Gym Hoodie', image: "https://lh3.googleusercontent.com/rfxBS7c_wlv2I5itpcjGb83MoP70xJEU-syYte6wQQcPUERxFOejBnRkbKGl8CLDLrePZkTv6vXMuw_KDOGJyLH4MlwdklS-icIAXAe9aRzPsnidKPGX6qiTLCGcCa5ZPYBur1ezN1VOUr4JsT5b6H6ABF-lCqa3IpFJNxhee3lk0rHFD2PU6iJCtEtQk6MPBgr6klr-7KpJsmdxCNg45KXSKVAX98tgE-Hy569Jw7Cd5eD_eCMqkGkj9evRMgrzEBLm6bz0UxpU4PNG3m2IDSeb6h-EqL_d8AURER3Oav2Rz26Wb4ZBZkNRjmEqjNLHYwoeQkjPUwvhpZ89s93NCxFls4tEEHbydzgIZt4qBKAGbCFnMnXThSW2ll6_fQ1w7wmt13m1g10G6KzwlsIeWKTy0ej1DFeYdM2s_k_GZo1lhZaNT9HUyioJLS7sdrgmJirrxSrlwB4n4dc5suxsL9CRdlKEI0T5U5cuKof42laa-vKPrzLXqrn3Wni6SBHh7ROa9gaNyimWh8sAfDquzgOcnCPgLQq-QUaW6YOhyadLKdDd4dYZjqBidjrGP0D636sCpaWvZguWiaLPVMKFUtmrI8w_Tp6W2M0S8bjt2fbyVNxZ1akpxd7cFAtSFFqRxMo5bpDYpbf1eb_3AWHvx0M3qM0vMC4cz9CJnFBQkOSyW0qSK19K70R9uMCEMIiOR0e62QRro2EhTMp7nV6kyIkGZc3pH6qsy_xqFDmzMt_TJhyFugK2KGZGDhGGOFP78lfTNMQd_5VUe9lATg73E_UcMQO7OeI=s991-no?authuser=0", price: 50.00, description: '100% hand spun cotton Hoodie. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Hoodies', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a Hoodies benefitting the south african garden gnomes', truetosize: true},
    {name: 'Grappling Pants Suit', image: "https://lh3.googleusercontent.com/k2KAaTSIxwfccBUQ76utxIZK4K2jV9ZzFp6r7kZ2pxYpUJKfDB_JWwLopkLzndgG6HS7DvHhGrI2MnfAjbMh0XympNQRZZkaPr2EPi3P2OjrMeupM__dkdCurwbGIIpbMkY63gNCzyzYQ9RKtt1_aczjqhDUKLtEBGYpi7wYV1Ef5zIon4j4MyTKMglcYX363pd5Mtr71AgEMvcH2NlM6QUKNTtWKXWhdQL_hnyiyZqGp5tsj6Jl32OgqdK5rQD4OUb1uUgDkcrDNElaE9yHNeP2gk4Zv2ZOgeYUEe9LbdA6x10FvoOtZiWOFoyAKKcwrMgL7d-r1m8g4GrBoO1UEggOoRaEgIsJ9JC_jUC6XXFzhqLGpTMZEsafID-KcqsKHi_Paqlm4iUAPhMmNh4IJjJj0Tfv7kMZLRCx4QGvxjQrxAev8bq9aRTShhpeYWbL_cjApVfToA05wwRCgHzrXlBk-XvNrnjWU1EG5JCPgQAYJDqESDBBP03IX9SkpKYOerOwOcCgiiRlLSiQisk69fKbh-mp66LeWcZyJzQkCspOtW25x5SDAAHt900ONe1GGz7kK9DBowr1cT7RWaHTJk3dJeq6K_kH4hBrpHHhOMTKtiZlXGHR0HhTS1QwSZxunVU_BO6YbCJ-UDKMgAjbIjcgsBq7quWLOM8m2tRMYe9DbZcJI0t2fbs7gUrrjvfjOF8--ollQj3x2P-5x1GP7NnzoOFXK_HM04Jhkgp-pekB65lhenbsUGCGIF_qSvLIHdoVWrKbPy61ACY9l21aNIMqKi54Sls=w449-h800-no?authuser=0", price: 125.00, description: '100% hand spun cotton Grappling Pants Suit. Made by hand from south african garden gnomes. All proceeds go directly to benefit the south african garden gnome humane society.', sizes: 'S, M, L, XL, XXL', sizeGuide: 'These fit like your normal everday Grappling Pants Suit', addInfo: 'The garden gnome society brings you the garden gnomes for change fundraiser. All garden gnomes deserve the best life possibe. Please do yourself a favor and buy yourself a Grappling Pants Suit benefitting the south african garden gnomes', truetosize: true},
]

Product.deleteMany({})
      .then((deletedProducts) => {
        // add the starter fruits
        Product.create(seedProducts)
          .then((newProducts) => {
            // log the new note to confirm their creation
            
            db.close();
          })
          .catch((error) => {
            console.log(error);
            db.close();
          });
      })
      .catch((error) => {
        console.log(error);
        db.close();
      });
  
    /////////////////////////////////////////////
    // Write your Seed Code Above
    ////////////////////////////////////////////
  });