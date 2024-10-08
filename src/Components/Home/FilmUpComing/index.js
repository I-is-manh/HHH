import React, { useEffect, useState } from "react";
import "./UpComing.css"
import { Row, Col } from "antd"
import { getUpComingLe } from "../../../Helper";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"
function FilmUpComing() {
    const [arrFilm, setArrFilm] = useState(null);
    const getFilm = async () => {
        const data = await getUpComingLe(1);
        return data
    }
    const { data } = useQuery({
        queryKey : ["upcoming"],
        queryFn : getFilm,
        staleTime : 6000 * 1000,
        cachTime : 6000 * 1000
    })
    useEffect(()=>{
        setArrFilm(data?.results)
    },[data])
    return (
        <div className="upcoming container-fluid">
            <div className="container">
                <div className="upcoming__header">
                    <p className="upcoming__title">Phim mới sắp chiếu</p>
                    <Link className="upcoming__seeAll" to={{
                        pathname : "/listupcoming",
                    }}>Xem tất cả</Link>
                </div>
                {arrFilm && arrFilm.length !== 0 &&
                    <Row className="upcoming__list" gutter={[10, 10]} justify={"space-between"}>
                        {arrFilm.map((item, index) => {
                            return (
                                <>
                                    {index < 8 ? <Col xxl={6} xl={6} lg={12} md={12} sm={12} xs={12} className="upcoming__item">
                                    {item.first_air_date ? <Link to={`/tv-show_detail/${item.id}/${item.original_name}`}>
                                            <div className="tv-show-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="tv-show-img"></img>
                                                <p className="tv-show__name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link> : <Link to={`/film_detail/${item.id}/${item.original_name}`}>
                                            <div className="tv-show-surro">
                                                <img src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} className="tv-show-img"></img>
                                                <p className="tv-show__name">{item.original_title ? item.original_title : item.original_name}</p>
                                            </div>
                                        </Link>}
                                    </Col> : null}
                                </>
                            )
                        })}
                    </Row>
                }
            </div>
        </div>
    );
}
export default FilmUpComing;