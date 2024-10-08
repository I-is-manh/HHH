import React, { useEffect, useState } from "react";
import "./FILMLE.css"
import { Row, Col } from "antd"
import { getFilmLe } from "../../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
let abc = "10"
function FilmLe() {
    const [arrFilm,setArrFilm] = useState(null)
    let filmExist = [];
    const getFilm = async () => {
        const data1 = await getFilmLe(1,null)
        const data2 = await getFilmLe(2,null)
        const data3 = await getFilmLe(3,null)
        let a = [...data1.results, ...data2.results, ...data3.results]
        return a
    }
    let { data } = useQuery(
        {
            queryKey: ['film'],
            queryFn: getFilm,
            staleTime : 100 * 1000,
            cacheTime : 100 * 1000,
            refetchOnMount : false,
            refetchOnWindowFocus : false
        }
    )
    useEffect(()=>{
        setArrFilm(data)
    },[data])
        
    const handleClick = (number) => {
        let newArr = data.filter((item) => {
            if (item.genre_ids.includes(number)) {
                return item;
            }
        });
        setArrFilm(newArr)
    }
    if (arrFilm) {
        if (arrFilm[0]) {
            filmExist.push(arrFilm[0].id);
        }
        if (arrFilm[1]) {
            filmExist.push(arrFilm[1].id);
        }
        if (arrFilm[2]) {
            filmExist.push(arrFilm[2].id);
        }
    }
    return (
        <div className="filmle container-fluid">
            <div className="container">
                <div className="filmle__header">
                    <p className="filmle__title">Phim lẻ mới cập nhật</p>
                    <Row className="filmle__genre">
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={28} onClick={() => { handleClick(28) }}>Hành động</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={16} onClick={() => { handleClick(16) }}>Hoạt hình</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={27} onClick={() => { handleClick(27) }}>Kinh dị</Col>
                        <Col xl={5} lg={5} md={10} sm={15} xs={15} className="filmle__genre__child" value={35} onClick={() => { handleClick(35) }}>Hài hước</Col>
                    </Row>
                    <Link className="filmle__seeall filmle__genre__child" to={{
                        pathname: "/showfilmle",
                    }}>Xem tất cả</Link>
                </div>
                {arrFilm &&
                    <Row className="filmle__container">
                        <Col xxl={10} xl={10} lg={24} md={24} sm={24} xs={24} className="filmle__left">
                            <Link to={`/film_detail/${arrFilm[0].id}/${arrFilm[0].original_title}`}>
                                <div className="filmle__BIGimg">
                                    <div className="filme-surro">
                                        <img src={`https://image.tmdb.org/t/p/original${data[0].backdrop_path}`} className="filmle__img"></img>
                                        <p className="filmle__name">{arrFilm[0].original_title}</p>
                                    </div>
                                </div>
                            </Link>
                            <Row gutter={[5]} style={{ height: "32%"}}>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} style={{ borderRadius: "5px", height: "100%" }}>
                                    <Link to={`/film_detail/${arrFilm[1].id}/${arrFilm[1].original_title}`}>
                                        <div className="filmle__under-left">
                                            <div className="filme-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${arrFilm[1].backdrop_path}`} className="filmle__img-small"></img>
                                                <p className="filmle__name">{arrFilm[1].original_title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                                <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12} style={{ borderRadius: "5px", height: "100%" }}>
                                    <Link to={`/film_detail/${arrFilm[2].id}/${arrFilm[2].original_title}`}>
                                        <div className="filmle__under-right">
                                            <div className="filme-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${arrFilm[2].backdrop_path}`} className="filmle__img-small"></img>
                                                <p className="filmle__name">{arrFilm[2].original_title}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </Col>
                            </Row>
                        </Col>
                        <Col xxl={14} xl={14} lg={24} md={24} sm={24} xs={24}>
                            <Row className="filmle__list" gutter={[0, 5]}>
                                {arrFilm && arrFilm.map((item, index) => {
                                    if (filmExist.includes(item.id) == false && index < 12) {
                                        filmExist.push(item.id)
                                        return (
                                            <Col xxl={8} xl={8} lg={12} md={12} sm={12} xs={12} className="filmle__item-list" key={item.id}>
                                                <Link to={`/film_detail/${item.id}/${item.original_title}`}>
                                                    <div className="filmle__item-surro">
                                                        <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="filmle__img-list"></img>
                                                        <p className="filmle__name-list">{item.original_title ? item.original_title : item.original_name}</p>
                                                    </div>
                                                </Link>
                                            </Col>
                                        )
                                    }
                                    else {
                                        return null
                                    }
                                })}
                            </Row>
                        </Col>
                    </Row>}
            </div>
        </div>
    );
}
export default FilmLe;